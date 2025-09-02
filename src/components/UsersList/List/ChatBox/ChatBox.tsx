import Avatar from "../../../../assets/avatar.png";

const ChatBox = () => {
    return (
        <div className="flex gap-4 cursor-pointer items-center  py-3 px-3 border-b border-[#3e86cea7]  hover:bg-[#03060981]">
            <div className="w-8 h-8">
                <img src={Avatar} alt="User Image" className="rounded-full" />
            </div>
            <div>
                <div className="username text-sm">Abdul</div>
                <div className="last-msg text-xs text-gray-300">abfsffsa</div>
            </div>
        </div>
    );
}

export default ChatBox;