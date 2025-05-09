// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyD3saYqnfbH2ZDPlR20t5_WkhBAShIT8U4",
  authDomain: "study-buddy-d744f.firebaseapp.com",
  projectId: "study-buddy-d744f",
  storageBucket: "study-buddy-d744f.firebasestorage.app",
  messagingSenderId: "844997543320",
  appId: "1:844997543320:web:764a85ed3a0e2dfc2dd7ed",
  measurementId: "G-NRHESRVN9Z"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, db, storage, googleProvider, facebookProvider };