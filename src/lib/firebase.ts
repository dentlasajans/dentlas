import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaNylnr8Z2yGkxbeur3Dhui5_5p_zh35Q",
  authDomain: "atlaspos-c2a3e.firebaseapp.com",
  projectId: "atlaspos-c2a3e",
  storageBucket: "atlaspos-c2a3e.firebasestorage.app",
  messagingSenderId: "7192452493",
  appId: "1:7192452493:web:cd48d6c2fab668251571c4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 
export const auth = getAuth(app);


