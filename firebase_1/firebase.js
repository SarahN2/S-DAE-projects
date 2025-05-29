// firebase.js
// must be loaded *after* the three compat scripts
const firebaseConfig = {
  apiKey: "AIzaSyB9WsU3zPb09kIwHScxJglZUaw3IgSN6TU",
  authDomain: "study-976a5.firebaseapp.com",
  projectId: "study-976a5",
  storageBucket: "study-976a5.firebasestorage.app",
  messagingSenderId: "355390907058",
  appId: "1:355390907058:web:063c2518c16d23ae9b5fab",
  measurementId: "G-B4HNS5TFWY"
};

// Initialize
firebase.initializeApp(firebaseConfig);

// Export globals
window.auth = firebase.auth();
window.db   = firebase.firestore();
