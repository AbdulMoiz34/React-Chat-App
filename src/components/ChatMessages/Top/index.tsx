import Avatar from "../../../assets/avatar.png";
import { IoCall, IoVideocam, IoInformationCircle } from "react-icons/io5";
import { useChatStore } from "../../../lib/chatStore";

const Top = () => {

    const { user } = useChatStore();
    
    return (
        <div className="flex flex-1 justify-between items-center border-[#3e86cea7] border-b py-4 px-2">
            <div className="flex items-center gap-4">
                <img src={Avatar} alt="avatar" className="w-10 h-10 object-cover rounded-full" />
                <div>
                    <p className="text-sm font-bold tracking-[0.14rem] capitalize">{user?.username || "User"}</p>
                    <p className="text-xs text-gray-300">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-4">
                <button className="hover:text-blue-800"><IoCall /></button>
                <button className="hover:text-blue-800"><IoVideocam /></button>
                <button className="hover:text-blue-800"><IoInformationCircle /></button>
            </div>
        </div>
    )
}

export default Top;