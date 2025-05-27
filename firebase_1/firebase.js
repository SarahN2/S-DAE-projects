// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9WsU3zPb09kIwHScxJglZUaw3IgSN6TU",
  authDomain: "study-976a5.firebaseapp.com",
  projectId: "study-976a5",
  storageBucket: "study-976a5.firebasestorage.app",
  messagingSenderId: "355390907058",
  appId: "1:355390907058:web:063c2518c16d23ae9b5fab",
  measurementId: "G-B4HNS5TFWY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
