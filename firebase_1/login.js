// login.js
const auth = window.auth;

// If already logged in, go straight to home.html
auth.onAuthStateChanged(user => {
  if (user) location.href = 'home.html';
});

// Handle login form submit
document.getElementById('login-form')
  .addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target['login-email'].value;
    const pwd   = e.target['login-password'].value;
    auth.signInWithEmailAndPassword(email, pwd)
      .then(() => { location.href = 'home.html'; })
      .catch(err => { alert('Login failed: ' + err.message); });
  });
