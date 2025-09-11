import { useEffect, useState } from "react";
import List from "./List";
import SearchBox from "./SearchBox";
import UserInfo from "./UserInfo";
import { useUserStore } from "../../lib/userStore";
import { db } from "../../lib/firebase";
import type { Chat } from "../../types";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const UsersList = () => {

    const [chats, setChats] = useState<[] | any>([]);

    const { currentUser } = useUserStore();


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser?.id as string), async (res) => {
            const items = res?.data()?.chats as Chat[];
            console.log(items);

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

    return (
        <div className="flex-1 flex flex-col gap-4 py-2">
            <UserInfo />
            <SearchBox />
            <List chats={chats} />
        </div>
    )
}

export default UsersList;