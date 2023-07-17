const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('chat message', {message: 'A user has connected'});

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', {message: 'A user has disconnected'});
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg.message);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
