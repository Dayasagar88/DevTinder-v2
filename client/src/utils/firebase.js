import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "devtinderv2.firebaseapp.com",
  projectId: "devtinderv2",
  storageBucket: "devtinderv2.firebasestorage.app",
  messagingSenderId: "704224197136",
  appId: "1:704224197136:web:c28592eb246cd290e8a895"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}
