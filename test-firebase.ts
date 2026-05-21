import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDie4Pv8oIvTgQUlKJjEliMtrN-owTTxFk",
  authDomain: "dentlas.firebaseapp.com",
  projectId: "dentlas",
  storageBucket: "dentlas.firebasestorage.app",
  messagingSenderId: "900425983957",
  appId: "1:900425983957:web:aeea566a59a42d60157f5c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  console.log("Checking firestore...");
  try {
    await setDoc(doc(db, "media", "testdoc"), { test: 123, createdAt: Date.now() });
    console.log("Write success!");
    const snap = await getDocs(collection(db, "media"));
    console.log("Read success, docs:", snap.docs.length);
  } catch(e) {
    console.error("Firestore test error:", e);
  }
}
test();
