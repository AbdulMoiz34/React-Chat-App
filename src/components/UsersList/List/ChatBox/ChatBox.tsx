import Avatar from "../../../../assets/avatar.png";
import { useUserStore } from "../../../../lib/userStore";
import type { Chat, User } from "../../../../types";

interface ChatBoxProps extends Chat {
    user: User;
    handleSelect: (chatId: string, user: User) => void;
}

const ChatBox = ({ user, lastMessage, chatId, isSeen, handleSelect }: ChatBoxProps) => {

    const { currentUser } = useUserStore();

    return (
        <div onClick={() => handleSelect(chatId, user)} className={`${!isSeen && "bg-[#0059b8be]"} flex gap-4 cursor-pointer items-center  py-3 px-3 border-b border-[#3e86cea7]  hover:bg-[#03060981]`}>
            <div className="w-8 h-8">
                <img src={Avatar} alt="User Image" className="rounded-full" />
            </div>
            <div>
                <div className="username text-sm">{user?.blockedUsers.includes(currentUser?.id as string) ? "User" : user?.username}</div>
                <div className="last-msg text-xs text-gray-300">{lastMessage}</div>
            </div>
        </div>
    );
}

export default ChatBox;