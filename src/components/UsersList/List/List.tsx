import ChatBox from "./ChatBox";
import { Scrollbar } from 'react-scrollbars-custom';
import "../../../index.css"
const List = () => {
    return (
        <Scrollbar>
            <div className="overflow-auto">
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
            </div>
        </Scrollbar>
    )
}

export default List;