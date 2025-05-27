import {
    auth,
    signInWithEmailAndPassword
  } from './firebase.js';
  
  const form = document.getElementById("login-form");
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "home.html";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });
  