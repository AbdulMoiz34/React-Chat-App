import { BsThreeDots } from "react-icons/bs";
import Avatar from "../../../assets/avatar.png";
import { CiVideoOn } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";

const UserInfo = () => {
    return (
        <div className="flex justify-between items-center px-2">
            <div className="w-7 h-7 rounded-full">
                <img src={Avatar} alt="User Avatar" className="object-cover w-full h-full border-1 border-solid border-blue-400 rounded-full" />
            </div>
            <div className="font-bold">John Doe</div>
            <div className="flex justify-center items-center gap-4 text-sm">
                <BsThreeDots className="cursor-pointer" />
                <CiVideoOn className="cursor-pointer" />
                <FaExternalLinkAlt size={12} className="text-gray-500 cursor-pointer" />
            </div>
        </div>
    )
}

export default UserInfo;