import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import axios from "axios";

const isUsernameTaken = async (username: string): Promise<boolean> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));

    try {
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; //If username is taken then false will bcmd

    } catch (err) {
        console.error("Error checking username:", err);
        throw new Error("Failed to check username availability.");
    }
};

const uploadImgOnCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat_app120301831938");

    try {
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/moiz34/image/upload",
            formData
        );

        return res.data.secure_url;
    } catch (err) {
        const error = err as Error;
        throw new Error(error.message || "something went wrong.");
    }
}

export { isUsernameTaken, uploadImgOnCloudinary };