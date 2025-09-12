import Avatar from "../../../../assets/avatar.png";
import { formatDistanceToNow } from "date-fns";

interface MessageBoxProps {
    type?: string;
    message: string;
    createdAt: number;
}

const MessageBox = ({ type, message, createdAt }: MessageBoxProps) => {

    return (
        <div className={`flex gap-4 max-w-11/12 ${type === "mine" ? "self-end" : ""}`}>
            <img src={Avatar} alt="User Avatar" className='w-8 h-8 rounded-full object-cover' />
            <div className="texts flex flex-col gap-2">
                <p className={`text-sm ${type == "mine" ? "bg-[#10223496]" : "bg-[#3e86ce73]"}  p-2 rounded-lg max-w-lg`}>
                    {message}
                </p>
                <span className='text-xs'>{formatDistanceToNow(createdAt, { addSuffix: true, includeSeconds: true })}</span>
            </div>
        </div>
    );
}

export default MessageBox;