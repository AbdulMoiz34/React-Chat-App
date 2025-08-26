import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCaeh2fE03sE22zQpmcCvy949c6lElb_PI",
    authDomain: "chat-app-58343.firebaseapp.com",
    projectId: "chat-app-58343",
    storageBucket: "chat-app-58343.firebasestorage.app",
    messagingSenderId: "51426634664",
    appId: "1:51426634664:web:07916a392f2cf58fae8b9d",
    measurementId: "G-SY4CBT3K1S"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { analytics, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, doc, setDoc, getDoc };