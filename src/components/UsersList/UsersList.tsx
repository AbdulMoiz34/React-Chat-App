import { useEffect, useState } from "react";
import List from "./List";
import SearchBox from "./SearchBox";
import UserInfo from "./UserInfo";
import { useUserStore } from "../../lib/userStore";
import { db } from "../../lib/firebase";
import type { Chat, User } from "../../types";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { showMessage } from "../../utils/notify";

const UsersList = () => {

    const [chats, setChats] = useState<[] | any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { currentUser } = useUserStore();
    const { changeChat } = useChatStore();


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser?.id as string), async (res) => {
            const items = res?.data()?.chats as Chat[];

            try {
                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);

                    const user = userDocSnap.data();

                    return { ...item, user };
                });

                const chatsData = await Promise.all(promises);

                setChats(chatsData.sort((a, b) => b.updatedAt - a.updatedAt));
            } catch (err) {
                showMessage({ type: "error", content: "something went wrong." });
                console.log(err);
            } finally {
                setLoading(false);
            }
        });

        return () => {
            unSub();
        }
    }, []);

    const handleSelect = async (chatId: string, user: User) => {
        const userChats = chats.map((item: any) => {
            const { user, ...rest } = item;

            return rest;
        });

        const chatIndex = userChats.findIndex((chat: Chat) => chat.chatId == chatId);
        userChats[chatIndex].isSeen = true;
        const userChatsRef = doc(db, "userChats", currentUser?.id as string);
        try {
            await updateDoc(userChatsRef, {
                chats: userChats
            });
        } catch (err) {
            console.log(err);
        }
        changeChat(chatId, user);
    }

    const [filteredChats, setFilteredChats] = useState<[] | any>([]);
    let id: ReturnType<typeof setTimeout>;
    const handleSearch = (val: string) => {
        clearTimeout(id);
        id = setTimeout(() => {
            setFilteredChats(chats.filter((chat: any) => chat.user?.username.includes(val.toLowerCase())));
            // setChats((prev: any) => prev.filter((chat: any) => chat.user?.username.includes(val.toLowerCase())));
        }, 1000);
    }

    return (
        <div className="flex-1 flex flex-col gap-4 py-2">
            <UserInfo />
            <SearchBox handleSearch={handleSearch} />
            <List chats={filteredChats.length ? filteredChats : chats} handleSelect={handleSelect} loading={loading} />
        </div>
    )
}

export default UsersList;