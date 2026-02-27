// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aicoursegeneration-ea763.firebaseapp.com",
  projectId: "aicoursegeneration-ea763",
  storageBucket: "aicoursegeneration-ea763.firebasestorage.app",
  messagingSenderId: "320866832796",
  appId: "1:320866832796:web:7c29f4964368d43a15b859",
  measurementId: "G-D2CTBPDZPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage= getStorage(app);