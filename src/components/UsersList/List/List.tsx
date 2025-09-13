import ChatBox from "./ChatBox";
import { Scrollbar } from 'react-scrollbars-custom';
import "../../../index.css"
import { Spin } from "antd";
import { memo } from "react";

const List = ({ chats, handleSelect, loading }: any) => {

    if (loading) {
        return <div className="w-full h-full flex justify-center">
            <Spin />
        </div>
    }

    return (
        <Scrollbar>
            <div className="overflow-auto">
                {chats?.map((chat: any) => <ChatBox key={chat.chatId} {...chat} handleSelect={handleSelect} />)}
            </div>
        </Scrollbar>
    )
}

export default memo(List);