import "./style.css";
import Avatar from "../../assets/avatar.png";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useState } from "react";
import type { User } from "../../types";
import { useFormStatus } from "react-dom";
import { useUserStore } from "../../lib/userStore";


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

const AddUser = () => {
    const [user, setUser] = useState<null | User>(null);
    const [error, setError] = useState<string>("");

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
        }
    }

    const addUserHandle = async () => {
        const chatsRef = collection(db, "chats");
        const userChatsRef = collection(db, "userChats");
        
        try {
            const newChatRef = doc(chatsRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: []
            });

            await updateDoc(doc(userChatsRef, user?.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser?.id,
                    updatedAt: Date.now()
                })
            });

            await updateDoc(doc(userChatsRef, currentUser?.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user?.id,
                    updatedAt: Date.now()
                })
            });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="addUser">
            <h3 className="text-center mb-4 font-medium text-lg">Add User</h3>
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
                    <button onClick={addUserHandle} className="bg-blue-500 py-2 px-2 hover:bg-blue-600 text-xs rounded-sm">Add User</button>
                </div>
            }
        </div>
    )
}

export default AddUser;