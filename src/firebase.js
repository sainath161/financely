// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5s4c2LWTawXsdJ8QrgA_z2A8ixLiWHcc",
  authDomain: "financely-mp.firebaseapp.com",
  projectId: "financely-mp",
  storageBucket: "financely-mp.appspot.com",
  messagingSenderId: "130669681722",
  appId: "1:130669681722:web:098d92fda67037956f2903",
  measurementId: "G-R1JEL9RQQ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(); // Change this line

export { db, auth, provider, doc, setDoc };
