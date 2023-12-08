// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASVP7Y2B5ZtgtgRWe1rR_I7vRJ_DHNHKs",
  authDomain: "re-audioapp.firebaseapp.com",
  projectId: "re-audioapp",
  storageBucket: "re-audioapp.appspot.com",
  messagingSenderId: "933192201206",
  appId: "1:933192201206:web:eadae18952927ce19c8dd7",
  measurementId: "G-98BYEYPCZS"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);