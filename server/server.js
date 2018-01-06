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

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'nascaranima',
    text: 'Hey!',
    createdOn: 123
  });

  socket.on('createMessage', (email, err) => {
    console.log('Created message', email);
  });

  socket.on('disconnect', (err) => {
    console.log('Client disconnected');
  });

});

server.listen(port, (err) => {
  console.log(`Server started on port ${port}`);
});
