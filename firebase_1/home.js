import {
    auth,
    onAuthStateChanged,
    signOut
  } from './firebase.js';
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById("user-email").textContent = `Logged in as ${user.email}`;
    } else {
      window.location.href = "login.html";
    }
  });
  
  document.getElementById("logout-btn").addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
  