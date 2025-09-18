import { useChatStore } from "../../../lib/chatStore";

const Top = () => {

    const { user } = useChatStore();


    const img = user?.avatar ?? `https://ui-avatars.com/api/?name=${user?.username}&background=0D8ABC&color=fff&size=128`;

    return (
        <div className="flex flex-1 justify-between items-center border-[#3e86cea7] border-b py-4 px-2">
            <div className="flex items-center gap-4">
                <img
                    src={img}
                    alt={user?.username} className="w-10 h-10 object-cover rounded-full" />
                <div>
                    <p className="text-sm font-bold tracking-[0.14rem] capitalize">{user?.username || "User"}</p>
                    <p className="text-xs text-gray-300">{user?.bio || "Bio."}</p>
                </div>
            </div>
        </div>
    )
}

export default Top;