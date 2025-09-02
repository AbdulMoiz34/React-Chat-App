import { ChatMessages, UserDetail, UsersList } from "../../components";

const Chat = () => {
    return (
        <div className="w-screen h-screen chat flex justify-center items-center text-white">
            <div className="w-[90vw] h-[90vh] bg-[#03060981] rounded-lg backdrop-blur-[5px]">
                <div className="flex w-full h-full overflow-hidden">
                    <UsersList />
                    <ChatMessages />
                    <UserDetail />
                </div>
            </div>
        </div>
    )
}

export default Chat;