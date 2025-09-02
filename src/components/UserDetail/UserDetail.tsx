import Avatar from "../../assets/avatar.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const UserDetail = () => {
    return (
        <div className="flex-1 py-4 flex flex-col gap-6">
            <div className="border-b border-[#3e86cea7] flex flex-col gap-2 justify-center items-center p-4">
                <img src={Avatar} alt="" className="w-20 h-20 rounded-full border-2 border-blue-500" />
                <p className="text-2xl">Ahmed</p>
                <p className="text-xs text-gray-300">Lorem ipsum.</p>
            </div>
            <div className="flex flex-col gap-4 px-2">
                <div className="flex justify-between items-center">
                    <p className="text-sm">Chat Settings</p>
                    <button><IoIosArrowUp className="bg-[#091c36] p-2 w-8 h-8 rounded-full hover:bg-black transition duration-300" /></button>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm">Privacy & help</p>
                    <button><IoIosArrowUp className="bg-[#091c36] p-2 w-8 h-8 rounded-full hover:bg-black transition duration-300" /></button>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm">Shared Photos</p>
                    <button><IoIosArrowDown className="bg-[#091c36] p-2 w-8 h-8 rounded-full hover:bg-black transition duration-300" /></button>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm">Shared files</p>
                    <button><IoIosArrowUp className="bg-[#091c36] p-2 w-8 h-8 rounded-full hover:bg-black transition duration-300" /></button>
                </div>
            </div>
            <div className="px-4 w-full flex flex-col gap-4">
                <button className="text-center bg-[#f7626292] hover:bg-[#f76262b6] w-full py-1.5 rounded-md">Block User</button>
                <button className="text-center bg-red-500 hover:bg-red-600 transition-all duration-300 w-full py-1.5 rounded-md">Log out</button>
            </div>
        </div>
    )
}

export default UserDetail;