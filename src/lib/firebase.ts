// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase Config (From Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBP2r_ZnetVEzZW3dkVUIxNmP0cfl3_vI4",
  authDomain: "hottake-ranked.firebaseapp.com",
  projectId: "hottake-ranked",
  storageBucket: "hottake-ranked.firebasestorage.app",
  messagingSenderId: "729885863876",
  appId: "1:729885863876:web:60023615a00e2dca59fe91",
  measurementId: "G-NFH93096H4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };