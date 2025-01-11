const socket = io(); // Initialize Socket.IO connection

// DOM elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Form submission event
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from refreshing the page
  if (input.value) {
    socket.emit('chat message', input.value); // Send message to server
    input.value = ''; // Clear input field
  }
});

// Listen for incoming messages from the server
socket.on('chat message', (msg) => {
  const item = document.createElement('li'); // Create a new list item
  item.textContent = msg; // Add message content
  messages.appendChild(item); // Append the item to the messages list
  window.scrollTo(0, document.body.scrollHeight); // Scroll to bottom
});
