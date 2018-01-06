const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket, err) => {
  if (err) {console.log(err);}
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    message: 'Welcome to the chat app'
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    message: 'New user joined',
    createdOn: new Date().getTime()
  });

  socket.on('createMessage', (message, err) => {
    console.log('Created message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdOn: new Date().getTime()
    });
  });

  socket.on('disconnect', (err) => {
    console.log('Client disconnected');
  });

});

server.listen(port, (err) => {
  console.log(`Server started on port ${port}`);
  if (err) {console.log(err);}
});
