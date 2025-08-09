import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgT9AXoTH1knsogOGhov-iDwMZrgzUEyo",
    authDomain: "todoapp-c1593.firebaseapp.com",
    projectId: "todoapp-c1593",
    storageBucket: "todoapp-c1593.appspot.com",
    messagingSenderId: "400249289175",
    appId: "1:400249289175:web:e275c057cba7d6703c7392",
    measurementId: "G-QG942CLTFF"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


