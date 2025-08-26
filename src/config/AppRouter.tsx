import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup, Login, Chat } from "../pages";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, doc, db, getDoc } from "../lib/firebase";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { setUser, type AuthState } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showMessage } from "../utils/notify";

const AppRouter = () => {
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            const initialState = { user: null, isLoading: false } as AuthState;

            if (!user) {
                dispatch(setUser(initialState));
                return;
            }

            try {
                const docRef = doc(db, "users", user?.uid as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const user = { user: docSnap.data(), isLoading: false } as AuthState;
                    dispatch(setUser(user));
                } else {
                    dispatch(setUser(initialState));
                }

            } catch (error: any) {
                console.log(user);
                showMessage({ type: "error", content: error.message || "something went wrong." })
            }
            
        })

        return () => unsub();
    }, []);

    if (isLoading) {
        return <Spin className="!text-white" fullscreen={true} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="signup" element={user ? <Navigate to="/chat" /> : <Signup />} />
                <Route path="login" element={user ? <Navigate to="/chat" /> : <Login />} />
                <Route path="chat" element={!user ? <Navigate to="/login" /> : <Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;