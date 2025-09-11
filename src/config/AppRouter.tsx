import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup, Login, Chat } from "../pages";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import { Spin } from "antd";

const AppRouter = () => {

    const { currentUser, fetchUserInfo, isLoading } = useUserStore();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid as string);
        })
    }, []);

    if (isLoading) {
        return (
            <div className="!bg-[#03060981] w-screen h-screen flex justify-center items-center">
                <Spin />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="signup" element={currentUser ? <Navigate to="/" /> : <Signup />} />
                <Route path="login" element={currentUser ? <Navigate to="/" /> : <Login />} />
                <Route path="/" element={currentUser ? <Chat /> : <Navigate to="login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;