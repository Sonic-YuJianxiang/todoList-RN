import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDeipyOYyHXG39azN9fj_o5pqoWq6Qs4sM",
    authDomain: "todolist-3cd8a.firebaseapp.com",
    projectId: "todolist-3cd8a",
    storageBucket: "todolist-3cd8a.appspot.com",
    messagingSenderId: "756071105295",
    appId: "1:756071105295:web:c7e0ec005a42ad67f6f47a"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const firebaseAuth = getAuth(firebaseApp);
