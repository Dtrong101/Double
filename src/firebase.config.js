// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {Storage, getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7g6yDnNd2SMoNBvAFDR8jsZGCK2Tjj0U",
  authDomain: "double-cdb45.firebaseapp.com",
  projectId: "double-cdb45",
  storageBucket: "double-cdb45.appspot.com",
  messagingSenderId: "1001439940308",
  appId: "1:1001439940308:web:14fdd1423cbb55387d7541"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;