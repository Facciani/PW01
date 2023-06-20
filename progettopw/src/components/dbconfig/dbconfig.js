import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBNAn9xW_wio56I4C26d88zlGpnbR6lP8o",
    authDomain: "pw01-ab6d1.firebaseapp.com",
    projectId: "pw01-ab6d1",
    storageBucket: "pw01-ab6d1.appspot.com",
    messagingSenderId: "228060737047",
    appId: "1:228060737047:web:cc4df54d6870c94968b652"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)