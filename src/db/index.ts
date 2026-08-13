// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDySur2169F8woyqTxPlx-GNOfdC632B-k",
  authDomain: "chat-8e9e9.firebaseapp.com",
  databaseURL: "https://chat-8e9e9-default-rtdb.firebaseio.com",
  projectId: "chat-8e9e9",
  storageBucket: "chat-8e9e9.firebasestorage.app",
  messagingSenderId: "39871529916",
  appId: "1:39871529916:web:e286330f405719162721b9",
  measurementId: "G-7D6YVM6TPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);