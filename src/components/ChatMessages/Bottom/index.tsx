import TextArea from "antd/es/input/TextArea";
import { AiOutlinePicture } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import { LiaSmileSolid } from "react-icons/lia";
import { MdKeyboardVoice } from "react-icons/md";

const Bottom = () => {
    return (
        <div className="flex-1 flex gap-2 px-3 py-2 justify-center items-center border-[#3e86cea7] border-t pt-4">
            <div className="flex-1 flex gap-4 justify-center items-center">
                <button><AiOutlinePicture /></button>
                <button><FaCamera /></button>
                <button><MdKeyboardVoice /></button>
            </div>
            <div className="flex-8">
                <TextArea className="!outline-none px-2 py-1 rounded-sm !bg-[#0C212F] w-full !text-white placeholder:!text-gray-500" placeholder="Send a message!" autoSize={{ minRows: 1, maxRows: 2 }} />
            </div>
            <div className="flex-1 flex gap-4 justify-center items-center">
                <button className="hover:text-yellow-500"><LiaSmileSolid /></button>
                <button className="px-3 py-1 rounded-sm text-sm border-none outline-none bg-blue-700 hover:bg-blue-800 transition-all duration-300">Send</button>
            </div>
        </div>
    )
}

export default Bottom;