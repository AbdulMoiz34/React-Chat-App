import ChatBox from "./ChatBox";
import { Scrollbar } from 'react-scrollbars-custom';
import "../../../index.css"

const List = ({ chats }: any) => {
    return (
        <Scrollbar>
            <div className="overflow-auto">
                {chats.map((chat:any) => <ChatBox key={chat.chatId} {...chat}  />)}
            </div>
        </Scrollbar>
    )
}

export default List;