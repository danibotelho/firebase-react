import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  
    apiKey: "AIzaSyA5TuDrcCkqfBYC4XjUmY51jWgmz8ZFqj0",
    authDomain: "react-firebase-a25f7.firebaseapp.com",
    projectId: "react-firebase-a25f7",
    storageBucket: "gs://react-firebase-a25f7.appspot.com",
    messagingSenderId: "5211920379",
    appId: "1:5211920379:web:2a1a01802ef526dd291d5e"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const storage = getStorage(app)
const authFirebase = getAuth(app)

export { authFirebase, firestore, storage }
 

