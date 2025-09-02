// users=> collection


type User = {
    id: string;
    blockedUsers: string[];
    email: string;
    username: string;
}

type Chats = {
    id: string;
    createdAt: Date;
    message: object[];
}

// message: {
// chatId: string;
// senderId: string;
// text: string;
// image: string;
// createdAt: string;
// }
type userChats = {
    id: string;
    chats: object[];
}

// user.id  = id;
// userChats > chats
// chats = {
// chatId: string;
// receiverId: string;
// lasMessage: string;
// isSeen: boolean;
// updatedAt: date
// }

// Tailwind, react-icons,react-router-dom, react-toastify, react 