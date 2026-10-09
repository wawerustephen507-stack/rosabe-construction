import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWqozd26wagv6IQcruqo5_6nAOjiTCIGE",
  authDomain: "rosabe-construction.firebaseapp.com",
  projectId: "rosabe-construction",
  storageBucket: "rosabe-construction.firebasestorage.app",
  messagingSenderId: "826716008351",
  appId: "1:826716008351:web:7b758753cbba4a4fec17aa"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);