// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaKo3kDnjH4ZgytUvW9rUHM2oTFud6mEE",
  authDomain: "nwitter-reloaded-69421.firebaseapp.com",
  projectId: "nwitter-reloaded-69421",
  storageBucket: "nwitter-reloaded-69421.appspot.com",
  messagingSenderId: "462326482608",
  appId: "1:462326482608:web:db82b4e3114511a3419d75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage()
export const db = getFirestore()
