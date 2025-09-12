import { useEffect, useState } from "react";
import List from "./List";
import SearchBox from "./SearchBox";
import UserInfo from "./UserInfo";
import { useUserStore } from "../../lib/userStore";
import { db } from "../../lib/firebase";
import type { Chat, User } from "../../types";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";

const UsersList = () => {

    const [chats, setChats] = useState<[] | any>([]);

    const { currentUser } = useUserStore();
    const { changeChat } = useChatStore();


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser?.id as string), async (res) => {
            const items = res?.data()?.chats as Chat[];

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                return { ...item, user };
            });

            const chatsData = await Promise.all(promises);
            setChats(chatsData.sort((a, b) => b.updatedAt - a.updatedAt));
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

    return (
        <div className="flex-1 flex flex-col gap-4 py-2">
            <UserInfo />
            <SearchBox />
            <List chats={chats} handleSelect={handleSelect} />
        </div>
    )
}

export default UsersList;