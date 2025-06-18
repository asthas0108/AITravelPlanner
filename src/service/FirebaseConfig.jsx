// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: "i-trav-1e891.firebaseapp.com",
  projectId: "i-trav-1e891",
  storageBucket: "i-trav-1e891.firebasestorage.app",
  messagingSenderId: "463436979638",
  appId: "1:463436979638:web:e851e7db99d15f48d53517",
  measurementId: "G-EBTM508D01"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);