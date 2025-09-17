import { BsThreeDots } from "react-icons/bs";
import { useUserStore } from "../../../lib/userStore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { auth, signOut } from "../../../lib/firebase";
import { showMessage } from "../../../utils/notify";
import { useChatStore } from "../../../lib/chatStore";

const UserInfo = () => {
    const { currentUser } = useUserStore();
    const [open, setOpen] = useState(false);

    const { logout } = useChatStore();

    const logoutHandler = async () => {
        signOut(auth)
            .then(() => showMessage({ type: "success", content: "Logout." }))
            .catch(err => showMessage({ type: "error", content: err.message }));
        logout();
    }

    const toggleItems = () => setOpen(prev => !prev);

    return (
        <div className="flex justify-between items-center px-2 relative">
            <div className="w-7 h-7 rounded-full">
                <img
                    src={`https://ui-avatars.com/api/?name=${currentUser?.username}&background=0D8ABC&color=fff&size=128`}
                    alt="User Avatar" className="object-cover w-full h-full border-1 border-solid border-blue-400 rounded-full" />
            </div>
            <div className="font-bold capitalize">{currentUser?.username}</div>
            <div className="flex justify-center items-center gap-4 text-sm">
                <BsThreeDots
                    onClick={toggleItems}
                    className={`cursor-pointer transition-transform duration-300 ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                        }`} />
                <RxCross1
                    onClick={toggleItems}
                    className={`cursor-pointer absolute transition-transform duration-300 ${open ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                        }`} />
            </div>

            {open && <div className="absolute z-10 text-center right-6 top-6 w-32 bg-[#2c2c2c80] backdrop-blur-md text-white text-sm rounded-lg shadow-xl border border-white/10 overflow-hidden">
                <Link
                    to="/profile"
                    className="block w-full px-4 py-2.5 hover:bg-white/10 transition-colors"
                >
                    Profile
                </Link>
                <button
                    onClick={logoutHandler}
                    className="block w-full px-4 py-2.5 hover:bg-white/10 hover:text-red-600  hover:!font-medium transition-colors"
                >
                    Logout
                </button>
            </div>}
        </div >
    )
}

export default UserInfo;