import {
    auth,
    createUserWithEmailAndPassword
  } from './firebase.js';
  
  const form = document.getElementById("signup-form");
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "home.html";
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  });
  