import Top from "./Top";
import Middle from "./Middle";
import Bottom from "./Bottom";

const ChatMessages = () => {
    return (
        <div className="flex-2 border-[#3e86cea7] border-r border-l">
            <div className="w-full h-full">
                <div className="flex flex-col w-full h-full">
                    <Top />
                    <Middle />
                    <Bottom />
                </div>
            </div>
        </div>
    )
}

export default ChatMessages;