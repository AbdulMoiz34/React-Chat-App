import { message } from "antd";

interface IMessage {
    type: "success" | "error" | "info" | "warning";
    content: string;
    duration?: number;
}

const showMessage = ({ type, content, duration = 3 }: IMessage) => {
    message[type]({ content, duration });
}

export { showMessage };