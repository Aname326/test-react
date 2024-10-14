// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHd9cfLa66cAR8uN2Un8jUOQvzsKSBy5g",
  authDomain: "react-test-1-f9807.firebaseapp.com",
  projectId: "react-test-1-f9807",
  storageBucket: "react-test-1-f9807.appspot.com",
  messagingSenderId: "150709759654",
  appId: "1:150709759654:web:ae96356b23add203854e67",
  measurementId: "G-LW9QNCTXBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);