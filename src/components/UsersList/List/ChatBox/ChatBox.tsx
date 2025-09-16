import { memo } from "react";
import Avatar from "../../../../assets/avatar.png";
import { useChatStore } from "../../../../lib/chatStore";
import { useUserStore } from "../../../../lib/userStore";
import type { Chat, User } from "../../../../types";
import { Tooltip } from "antd";
import { TiMessageTyping } from "react-icons/ti";

interface ChatBoxProps extends Chat {
    user: User;
    handleSelect: (chatId: string, user: User) => void;
}

const ChatBox = ({ user, lastMessage, chatId, isSeen, handleSelect, isTyping }: ChatBoxProps) => {

    const { currentUser } = useUserStore();
    const { chatId: currentChatId } = useChatStore();

    const isCurrentChat = chatId == currentChatId;

    return (
        <div onClick={() => handleSelect(chatId, user)} className={`${!isSeen && "bg-[#0059b8be]"} relative flex gap-4 cursor-pointer items-center  py-3 px-3 border-b border-[#3e86cea7] hover:bg-[#03060981] ${isCurrentChat && "bg-[#03060981]"}`}>
            <div className="w-8 h-8">
                <img src={Avatar} alt="User Image" className={`rounded-full ${isCurrentChat && "border-[#3e86cea7] border-1"}`} />
            </div>
            <div>
                <div className={`username text-sm capitalize ${isCurrentChat && "font-medium"}`}>{user?.blockedUsers.includes(currentUser?.id as string) ? "User" : user?.username}</div>
                <div className="last-msg text-xs text-gray-300">{lastMessage}</div>
            </div>
            {isTyping && (
                <div className="absolute right-8 flex items-center">
                    <Tooltip title={<span className="bg-[#03060981] text-blue-500 text-xs">Typing...</span>}>
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