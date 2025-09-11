import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';
import type { User } from '../types';

export interface UserState {
    currentUser: User | null;
    isLoading: boolean;
    fetchUserInfo: (uid: string) => Promise<void>;
}

const initialState = {
    currentUser: null,
    isLoading: false
};

const useUserStore = create<UserState>((set) => ({
    currentUser: null,
    isLoading: true,

    fetchUserInfo: async (uid: string | null) => {
        if (!uid) return set(initialState);
        set({ isLoading: true });

        try {
            const docSnap = await getDoc(doc(db, "users", uid));
            if (docSnap.exists()) {
                set({ currentUser: docSnap.data() as User, isLoading: false });
            } else {
                set(initialState);
            }
        } catch (err) {
            console.log(err);
            return set(initialState);
        }
    }
}))

export { useUserStore };