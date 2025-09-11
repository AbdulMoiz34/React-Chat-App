import { create } from 'zustand'
import type { User } from '../types';
import { useUserStore } from './userStore';

export interface ChatState {
    chatId: null | string;
    user: null | User;
    isCurrentUserBlocked: null | boolean;
    isReceiverBlocked: null | boolean;
    changeChat: (chatId: string, user: User) => void;
    changeBlock: () => void;
    logout: () => void;
}

const initialState = {
    chatId: null,
    user: null,
    isCurrentUserBlocked: null,
    isReceiverBlocked: null
};

const useChatStore = create<ChatState>((set) => ({
    ...initialState,

    changeChat: (chatId: string, user: User) => {
        const currentUser = useUserStore.getState().currentUser;

        // CHECK IF USER IS BLOCKED
        if (user.blockedUsers.includes(currentUser?.id ?? "")) {
            return set({
                chatId: chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false
            });
        }

        // CHECK IF CURRENT USER IS BLOCKED
        else if (currentUser?.blockedUsers.includes(user.id)) {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true
            });
        }

        return set({
            chatId: chatId,
            user: user,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false
        });
    },

    changeBlock: () => {
        set((state: ChatState) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }))
    },
    logout: () => {
        set(initialState);
    }
}))

export { useChatStore };