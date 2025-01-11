const express = require('express'); // Framework for handling HTTP requests
const http = require('http');       // Core HTTP module to create a server
const { Server } = require('socket.io'); // Import Socket.IO library

// Initialize the Express app
const app = express();
const server = http.createServer(app); // Create an HTTP server using Express
const io = new Server(server); // Attach Socket.IO to the server

// Serve the frontend static files
app.use(express.static('public'));

// Set up a connection event for Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'chat message' events from clients
  socket.on('chat message', (msg) => {
    console.log('Message received: ', msg);
    io.emit('chat message', msg); // Broadcast the message to all clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});