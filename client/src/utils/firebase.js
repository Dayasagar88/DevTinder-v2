import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "devtinderv2-f52d3.firebaseapp.com",
  projectId: "devtinderv2-f52d3",
  storageBucket: "devtinderv2-f52d3.firebasestorage.app",
  messagingSenderId: "97470768805",
  appId: "1:97470768805:web:2bd36b2be4a27cc8144f4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}
