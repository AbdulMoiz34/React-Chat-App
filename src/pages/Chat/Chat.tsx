import { ChatMessages, UserDetail, UsersList } from "../../components";
import { useChatStore } from "../../lib/chatStore";

const Chat = () => {

    const { chatId } = useChatStore();

    return (
        <div className="w-screen h-screen chat flex justify-center items-center text-white">
            <div className="w-[90vw] h-[90vh] bg-[#03060981] rounded-lg backdrop-blur-[5px]">
                <div className="flex w-full h-full overflow-hidden">
                    <UsersList />
                    {chatId && <ChatMessages />}
                    {chatId && <UserDetail />}
                    {!chatId &&
                        <div className="flex-2 border-l border-[#3e86cea7] flex justify-center items-center">
                            <span className="text-[#a9a9a9ad] font-medium w-3/6 text-center text-4xl">Select a chat to start a conversation</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat;