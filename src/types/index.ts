interface User {
    id: string;
    email: string;
    username: string;
    blockedUsers: string[];
    // avatar: string;
}

interface Chat {
    chatId: string;
    lastMessage: string;
    receiverId: string;
    updatedAt: number;
    isSeen: boolean;
}

interface UserChats {
    id: string;
    chats: Chat[];
}

interface Message {
    chatId: string;
    senderId: string;
    text: string;
    createdAt: Date;
}

interface Chats {
    id: string;
    createdAt: Date;
    messages: Message[];
}

export type { User, Chat, UserChats, Chats, Message };