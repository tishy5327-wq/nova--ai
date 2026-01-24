// Simple chat UI – talks to /api/chat (Netlify Function)
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

// Append a message to the chat window
function addMessage(text, from = 'ai') {
  const el = document.createElement('div');
  el.className = `message ${from}`;
  el.textContent = (from === 'user' ? '🗣️ ' : '🤖 ') + text;
  chatBox.appendChild(el);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle form submit
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = userInput.value.trim();
  if (!query) return;
  addMessage(query, 'user');
  userInput.value = '';

  // Call Netlify function
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: query })
    });
    const data = await res.json();
    addMessage(data.reply);
  } catch (err) {
    console.error(err);
    addMessage('Sorry, something went wrong.', 'ai');
  }
});
