// home.js
const auth = window.auth;
const db   = window.db;
let currentUser = null;

// Auth guard → redirect to login if signed out
auth.onAuthStateChanged(u => {
  if (!u) return location.href = 'index.html';
  currentUser = u;
  initApp();
});

function initApp() {
  // Logout
  document.getElementById('logout-btn')
    .onclick = () => auth.signOut().then(() => location.href = 'index.html');

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelector('.tab-btn.active').classList.remove('active');
      document.querySelector('.tab-content.active').classList.remove('active');
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    };
  });

  // Flashcards
  document.getElementById('add-flashcard').onclick = addFlashcard;
  loadFlashcards();

  // Notes
  document.getElementById('save-notes').onclick = saveNotes;
  loadNotes();

  // Quiz
  document.getElementById('start-quiz').onclick = startQuiz;
}

// ─── Flashcards ───────────────────────
async function loadFlashcards() {
  const list = document.getElementById('flashcard-list');
  list.textContent = 'Loading…';
  const snap = await db.collection('users')
                       .doc(currentUser.uid)
                       .collection('flashcards')
                       .get();

  list.innerHTML = '';
  snap.forEach(doc => {
    const { front, back } = doc.data();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <p><strong>Front:</strong> ${front}</p>
      <p><strong>Back:</strong> ${back}</p>
      <div class="actions">
        <button data-id="${doc.id}" class="edit">Edit</button>
        <button data-id="${doc.id}" class="delete">Delete</button>
      </div>`;
    list.appendChild(card);

    card.querySelector('.delete').onclick = () =>
      db.collection('users')
        .doc(currentUser.uid)
        .collection('flashcards')
        .doc(doc.id)
        .delete()
        .then(loadFlashcards);

    card.querySelector('.edit').onclick = async () => {
      const nf = prompt('New front:', front);
      const nb = prompt('New back:',  back);
      if (nf && nb) {
        await db.collection('users')
                .doc(currentUser.uid)
                .collection('flashcards')
                .doc(doc.id)
                .set({ front: nf, back: nb });
        loadFlashcards();
      }
    };
  });
}

async function addFlashcard() {
  const f = document.getElementById('front-text').value.trim();
  const b = document.getElementById('back-text').value.trim();
  if (!f || !b) return alert('Both fields required');
  await db.collection('users')
          .doc(currentUser.uid)
          .collection('flashcards')
          .add({ front: f, back: b });
  document.getElementById('front-text').value = '';
  document.getElementById('back-text').value  = '';
  loadFlashcards();
}

// ─── Notes ───────────────────────────
async function loadNotes() {
  const snap = await db.collection('users')
                       .doc(currentUser.uid)
                       .collection('notes')
                       .doc('myNotes')
                       .get();
  document.getElementById('notes-area').value =
    snap.exists ? snap.data().content : '';
}

async function saveNotes() {
  const content = document.getElementById('notes-area').value;
  await db.collection('users')
          .doc(currentUser.uid)
          .collection('notes')
          .doc('myNotes')
          .set({ content });
  alert('Notes saved!');
}

// ─── Quiz ────────────────────────────
async function startQuiz() {
  const snap  = await db.collection('users')
                        .doc(currentUser.uid)
                        .collection('flashcards')
                        .get();
  const cards = snap.docs.map(d => d.data());
  if (!cards.length) return alert('No flashcards.');
  cards.sort(() => Math.random() - 0.5);

  let idx = 0, score = 0;
  const C = document.getElementById('quiz-container');
  C.innerHTML = '';

  function showQ() {
    C.innerHTML = `
      <div class="quiz-form">
        <p>Q${idx+1}: ${cards[idx].front}</p>
        <input id="answer" placeholder="Your answer…" />
        <button id="check-btn">Check</button>
      </div>
      <div id="feedback"></div>`;
    document.getElementById('check-btn').onclick = () => {
      const ans  = document.getElementById('answer').value.trim().toLowerCase();
      const corr = cards[idx].back.trim().toLowerCase();
      const FB   = document.getElementById('feedback');
      if (ans === corr) { score++; FB.textContent = '✅ Correct!'; }
      else              { FB.textContent = `❌ Wrong. Answer: ${cards[idx].back}`; }
      const NB = document.createElement('button');
      NB.textContent = idx+1 < cards.length ? 'Next' : 'Finish';
      NB.onclick = () => {
        idx++;
        if (idx < cards.length) showQ();
        else C.innerHTML = `<p>Quiz complete! Score: ${score}/${cards.length}</p>`;
      };
      FB.appendChild(NB);
    };
  }

  showQ();
}
