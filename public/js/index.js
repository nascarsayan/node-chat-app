var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
  socket.emit('createMessage', {
    to: 'nascarjeet',
    text: 'Hi!'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (email, err) {
  console.log('New message', email);
});
