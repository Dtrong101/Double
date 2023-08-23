import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCd5pcD-R5mVajYWXVp7Lo_IMgvaIL9ZjI",
    authDomain: "commercialweb-69bd0.firebaseapp.com",
    projectId: "commercialweb-69bd0",
    storageBucket: "commercialweb-69bd0.appspot.com",
    messagingSenderId: "907220225466",
    appId: "1:907220225466:web:37d3808957af33147f2183"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;