// signup.js
const auth = window.auth;

// If already logged in, go straight to home.html
auth.onAuthStateChanged(user => {
  if (user) location.href = 'home.html';
});

// Handle sign-up form submit
document.getElementById('signup-form')
  .addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target['signup-email'].value;
    const pwd   = e.target['signup-password'].value;
    auth.createUserWithEmailAndPassword(email, pwd)
      .then(() => { location.href = 'home.html'; })
      .catch(err => { alert('Signup failed: ' + err.message); });
  });
