// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

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
const analytics = getAnalytics(app);
export const auth = getAuth(app);