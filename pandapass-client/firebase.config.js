import { initializeApp, getApps } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDz0GoPS8E4GXwU8F0e3V5RtXIks1un_3w",
    authDomain: "pandapass-779a5.firebaseapp.com",
    projectId: "pandapass-779a5",
    storageBucket: "pandapass-779a5.appspot.com",
    messagingSenderId: "587787837467",
    appId: "1:587787837467:web:70abc559191162842fd8be",
    measurementId: "G-REN97VQF5Z"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const Authprovider = new TwitterAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);



export default app;