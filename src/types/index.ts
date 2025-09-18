interface User {
    id: string;
    email: string;
    username: string;
    blockedUsers: string[];
    bio?: string;
    avatar?: string;
}

interface Chat {
    chatId: string;
    lastMessage: string;
    receiverId: string;
    updatedAt: number;
    isSeen: boolean;
    isTyping: boolean;
}

interface UserChats {
    chats: Chat[];
}

interface Message {
    chatId: string;
    senderId: string;
    text: string;
    createdAt: number;
}

interface Chats {
    createdAt: Date;
    messages: Message[];
}

export type { User, Chat, UserChats, Chats, Message };