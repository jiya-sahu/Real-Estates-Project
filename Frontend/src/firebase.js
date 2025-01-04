// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3d854.firebaseapp.com",
  projectId: "mern-estate-3d854",
  storageBucket: "mern-estate-3d854.firebasestorage.app",
  messagingSenderId: "833490749891",
  appId: "1:833490749891:web:ad8290f772ffce2aed1576"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);