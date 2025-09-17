import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

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


export { isUsernameTaken };