import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyA5TuDrcCkqfBYC4XjUmY51jWgmz8ZFqj0",
  authDomain: "react-firebase-a25f7.firebaseapp.com",
  projectId: "react-firebase-a25f7",
  storageBucket: "react-firebase-a25f7.appspot.com",
  messagingSenderId: "5211920379",
  appId: "1:5211920379:web:2a1a01802ef526dd291d5e"
};

const app = initializeApp(firebaseConfig);
 export const firestore = getFirestore(app)

