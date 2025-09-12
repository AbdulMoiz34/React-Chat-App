import { Scrollbar } from 'react-scrollbars-custom';
import MessageBox from './MessageBox';
import { useEffect, useRef, useState } from 'react';
import type { Chats } from '../../../types';
import { useUserStore } from '../../../lib/userStore';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

const Middle = () => {
    const endRef = useRef<HTMLDivElement | null>(null);
    const [chats, setChats] = useState<null | Chats>(null);
    const { currentUser } = useUserStore();
    const { chatId } = useChatStore();

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", chatId as string), (res) => {
            setChats(res.data() as Chats);
        });

        return () => {
            unsub();
        }

    }, [chatId]);

    return (
        <Scrollbar>
            <div className="flex-10 py-3 px-2 overflow-auto flex flex-col gap-6 ">
                {chats?.messages.map(msg => (
                    <MessageBox message={msg.text} createdAt={msg.createdAt} type={(msg.senderId == currentUser?.id) ? "mine" : ""} />
                ))}
                {/* <MessageBox message='Hello' />
                <MessageBox message='Who are you?' type="mine" />
                <MessageBox message="I'm fine" />
                <MessageBox message="I'm okay." />
                <MessageBox message="I'm absolutely fine." />
                <MessageBox message="ok." />
                <MessageBox type="mine" message='end message Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sed tempore magnam. Aliquid assumenda iure, iste exffffffffffffffffffffffff' /> */}
                <div ref={endRef}></div>
            </div>
        </Scrollbar>
    )
}

export default Middle;