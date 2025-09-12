import TextArea from "antd/es/input/TextArea";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import { FaFaceSmile } from "react-icons/fa6";
import { MdKeyboardVoice } from "react-icons/md";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import { useUserStore } from "../../../lib/userStore";

const Bottom = () => {
    const [text, setText] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const { currentUser } = useUserStore();
    const { chatId } = useChatStore();

    const handleEmoji = (emojiData: EmojiClickData) => {
        console.log(emojiData.emoji);
        setText(prev => prev + emojiData.emoji);
    }

    const handleSend = async () => {
        if (text === "") return;

        await updateDoc(doc(db, "chats", chatId as string), {
            messages: arrayUnion({
                senderId: currentUser?.id,
                createdAt: Date.now(),
                text,
            })
        });

    }

    return (
        <div className="flex-1 flex gap-2 px-3 py-2 justify-center items-center border-[#3e86cea7] border-t pt-4">
            <div className="flex-1 flex gap-4 justify-center items-center">
                <button><AiOutlinePicture /></button>
                <button><FaCamera /></button>
                <button><MdKeyboardVoice /></button>
            </div>
            <div className="flex-8">
                <TextArea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Send a message!"
                    className="!outline-none px-2 py-1 rounded-sm !bg-[#0C212F] w-full !text-white placeholder:!text-gray-500"
                    autoSize={{ minRows: 1, maxRows: 2 }}
                />
            </div>
            <div className="flex-1 flex gap-4 justify-center items-center relative">
                <div className="emoji relative top-0">
                    <button
                        className={`hover:text-yellow-500 font-bold ${open ? "text-yellow-500 text-lg" : "text-yellow-300"}`}
                        onClick={() => setOpen(prev => !prev)}><FaFaceSmile />
                    </button>
                    <EmojiPicker onEmojiClick={handleEmoji} open={open} className="!absolute bottom-10" />
                </div>
                <button onClick={handleSend} className="px-3 py-1 rounded-sm text-sm border-none outline-none bg-blue-700 hover:bg-blue-800 transition-all duration-300">Send</button>
            </div>
        </div>
    )
}

export default Bottom;