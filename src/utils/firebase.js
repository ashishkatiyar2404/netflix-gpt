// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZq9TUY6fUcjdDJ5kwq7IXCv7xJjp04ZY",
  authDomain: "netflixgpt-cf4d2.firebaseapp.com",
  projectId: "netflixgpt-cf4d2",
  storageBucket: "netflixgpt-cf4d2.firebasestorage.app",
  messagingSenderId: "244159681508",
  appId: "1:244159681508:web:4c59f3bf556c1631ee2df1",
  measurementId: "G-X24GWEBLEK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();
