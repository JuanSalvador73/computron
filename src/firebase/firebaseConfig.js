// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWMMUb8KRqg2vyb9IX39zSsmYVY3j6wJM",
  authDomain: "proyecto-01-coderhouse.firebaseapp.com",
  projectId: "proyecto-01-coderhouse",
  storageBucket: "proyecto-01-coderhouse.firebasestorage.app",
  messagingSenderId: "939718437304",
  appId: "1:939718437304:web:8bfd2eefa9674200fc874d",
  measurementId: "G-QRLXGPPDYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);