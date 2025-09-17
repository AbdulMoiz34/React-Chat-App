import { memo } from "react";
import { useChatStore } from "../../../../lib/chatStore";
import { useUserStore } from "../../../../lib/userStore";
import type { Chat, User } from "../../../../types";
import { Tooltip } from "antd";

interface ChatBoxProps extends Chat {
    user: User;
    handleSelect: (chatId: string, user: User) => void;
}

const ChatBox = ({ user, lastMessage, chatId, isSeen, handleSelect, isTyping }: ChatBoxProps) => {

    const { currentUser } = useUserStore();
    const { chatId: currentChatId } = useChatStore();

    const isCurrentChat = chatId == currentChatId;

    return (
        <div
            onClick={() => handleSelect(chatId, user)}
            className={`relative flex items-center gap-4 cursor-pointer py-3 px-3 border-b border-[#3e86cea7] hover:bg-[#03060981] transition-colors ${!isSeen ? "bg-[#0059b8be]" : ""} ${isCurrentChat ? "bg-[#03060981]" : ""}`}>
            <div className="w-8 h-8">
                <img
                    src={`https://ui-avatars.com/api/?name=${user?.username}&background=0D8ABC&color=fff&size=128`}
                    alt="User"
                    className={`rounded-full ${isCurrentChat ? "border border-[#3e86cea7]" : ""}`}
                />
            </div>

            <div className="flex-1 min-w-0">
                <div
                    className={`username text-sm capitalize ${isCurrentChat && "font-medium"}`}>
                    {user?.blockedUsers.includes(currentUser?.id as string) ? "User" : user?.username}
                </div>
                <div className="text-xs text-gray-300 truncate">
                    {lastMessage}
                </div>
            </div>

            {isTyping && (
                <div className="absolute right-3 flex items-center">
                    <Tooltip
                        title={
                            <span className="bg-[#03060981] text-blue-500 text-xs">
                                Typing...
                            </span>
                        }>
                        <div className="flex space-x-1">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
                        </div>
                    </Tooltip>
                </div>
            )}
        </div>

    );
}

export default memo(ChatBox);