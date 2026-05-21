import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDie4Pv8oIvTgQUlKJjEliMtrN-owTTxFk",
  authDomain: "dentlas.firebaseapp.com",
  databaseURL: "https://dentlas-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dentlas",
  storageBucket: "dentlas.firebasestorage.app",
  messagingSenderId: "900425983957",
  appId: "1:900425983957:web:aeea566a59a42d60157f5c",
  measurementId: "G-109H7VWD0X"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 
export const auth = getAuth(app);


