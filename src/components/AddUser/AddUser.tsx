import "./style.css";
import Avatar from "../../assets/avatar.png";
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useState } from "react";
import type { Chat, User, UserChats } from "../../types";
import { useFormStatus } from "react-dom";
import { useUserStore } from "../../lib/userStore";
import { showMessage } from "../../utils/notify";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Tooltip } from "antd";


function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
            className="bg-blue-500 disabled:bg-gray-400 disabled:text-gray-200 disabled:!cursor-not-allowed p-2 px-3 hover:bg-blue-600 text-xs rounded-sm">
            {pending ? "searching..." : "Search"}
        </button>
    );
}

interface AddUserProps {
    close: () => void;
}
const AddUser = ({ close }: AddUserProps) => {

    const [user, setUser] = useState<null | User>(null);
    const [error, setError] = useState<string>("");
    const [isUserExist, setIsUserExist] = useState<boolean>(false);

    const { currentUser } = useUserStore();


    const searchHandle = async (formData: FormData) => {
        const username = formData.get("username")?.toString().trim().toLowerCase();
        if (!username) return;

        if (currentUser?.username.toLowerCase() == username) {
            setError("Same User is not allowed.");
            setUser(null);
            return;
        }

        try {
            setError("");
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username));

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setUser(querySnapshot.docs[0].data() as User);
            } else {
                setError(`${username} not found.`);
                setUser(null);
            }
        } catch (err) {
            setError(err as string);
            console.log(err);
        } finally {
            setIsUserExist(false);
        }
    }

    const isUserAlreadyExist = (chats: Chat[]) => {
        for (let chat of chats) {
            if (chat.receiverId == user?.id) {
                return true;
            }
        }

        return false;
    }

    const addUserHandle = async () => {
        const chatsRef = collection(db, "chats");
        const userChatsRef = collection(db, "userChats",);

        const userChatsSnapshot = await getDoc(doc(db, "userChats", currentUser?.id as string));
        const userChats = userChatsSnapshot.data() as UserChats;

        const isUserExist = isUserAlreadyExist(userChats.chats);

        if (isUserExist) {
            setIsUserExist(true);
            return showMessage({ type: "error", content: `${user?.username} is already exist in your chat.` });
        }

        try {
            const newChatRef = doc(chatsRef);
            close();

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: []
            });

            await updateDoc(doc(userChatsRef, user?.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser?.id,
                    updatedAt: Date.now(),
                    isSeen: true
                })
            });

            await updateDoc(doc(userChatsRef, currentUser?.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user?.id,
                    updatedAt: Date.now(),
                    isSeen: true
                })
            });

            showMessage({ type: "success", content: `${user?.username} added in your chat.` });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="addUser relative">
            <h3 className="text-center mb-4 font-medium text-lg">Add User</h3>
            <button onClick={close} className="absolute right-5 top-2 text-lg hover:text-blue-300">
                <Tooltip title="Do u wanna close it?">
                    <IoIosCloseCircleOutline />
                </Tooltip>
            </button>
            <form action={searchHandle} className="search">
                <input type="text" placeholder="Username" name="username" className="text-sm" />
                <SubmitButton />
            </form>
            {
                error &&
                <div className="mt-8 text-center text-lg">
                    {error}
                </div>
            }
            {
                user &&
                <div className="user flex justify-between mt-8 items-center">
                    <div className="details flex gap-6 items-center">
                        <img src={Avatar} alt="User Image" className="w-11 h-11 object-cover rounded-full" />
                        <div className="flex flex-col items-center">
                            <p className="username text-sm font-bold capitalize">{user.username}</p>
                            <p className="text-[11px]">{user.email}</p>
                        </div>
                    </div>
                    <button disabled={isUserExist} onClick={addUserHandle} className="bg-blue-500 py-2 px-2 hover:bg-blue-600 text-xs rounded-sm disabled:!cursor-not-allowed disabled:opacity-70">Add User</button>
                </div>
            }
        </div>
    )
}

export default AddUser;