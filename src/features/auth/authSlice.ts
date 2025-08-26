import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

export interface AuthState {
    user: null | User;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: true
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<AuthState>) {
            state.user = action.payload.user;
            state.isLoading = action.payload.isLoading;
        },
        logout(state) {
            state.user = null;
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;