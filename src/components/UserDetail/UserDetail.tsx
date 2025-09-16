import Avatar from "../../assets/avatar.png";
import { auth, db, signOut } from "../../lib/firebase";
import { showMessage } from "../../utils/notify";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayUnion, doc, updateDoc, arrayRemove } from "firebase/firestore";
import Scrollbar from "react-scrollbars-custom";
import { useState } from "react";

const UserDetail = () => {

    const { logout, isCurrentUserBlocked, isReceiverBlocked, changeBlock, user } = useChatStore();
    const { currentUser } = useUserStore();

    const [loading, setLoading] = useState<boolean>(false);

    const logoutHandler = async () => {
        signOut(auth)
            .then(() => showMessage({ type: "success", content: "Logout." }))
            .catch(err => showMessage({ type: "error", content: err.message }));
        logout();
    }

    const handleBlock = async () => {
        setLoading(true);
        try {

            const userRef = doc(db, "users", currentUser?.id as string);
            await updateDoc(userRef, {
                blockedUsers: isReceiverBlocked ? arrayRemove(user?.id) : arrayUnion(user?.id)
            });
            changeBlock();
        } catch (err) {
            showMessage({ type: "error", content: "check your internet." });
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="flex-1 py-4 flex flex-col gap-6 relative">
            <Scrollbar>
                <div className="border-b border-[#3e86cea7] flex flex-col gap-2 justify-center items-center p-4">
                    <img src={Avatar} alt="" className="w-20 h-20 rounded-full border-2 border-blue-500" />
                    <p className="text-2xl capitalize">{user?.username || "User"}</p>
                    <p className="text-xs text-gray-300">Description.</p>
                </div>
                <div className="px-4 w-full flex flex-col gap-3 mt-4 absolute bottom-0">
                    <button disabled={isCurrentUserBlocked as boolean || loading} onClick={handleBlock} className="disabled:!cursor-not-allowed text-center bg-[#f7626292] hover:bg-[#f76262b6] w-full py-1 text-sm rounded-md">
                        {loading ? "Updating..." : isCurrentUserBlocked ? "You are blocked" : isReceiverBlocked ? "Blocked User" : "Block User"}
                    </button>
                    <button onClick={logoutHandler} className="text-center bg-red-500 hover:bg-red-600 transition-all duration-300 w-full py-1 text-sm rounded-md">Log out</button>
                </div>
            </Scrollbar>
        </div>
    )
}

export default UserDetail;