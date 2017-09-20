
//importing express
var express = require('express');

//importing our socket library
var socket  = require('socket.io');

//setting the express app
var app = express();

//creating my server
var server = app.listen(3000, function () {
  console.log("listening to port 3000!");
});

//sending everythin inside our public folder to the server
//question: can I send pictures as well? and p5.js files? and webpd files? movies?
app.use(express.static('public'));

//initing the sockets library for the server
var io = socket(server);

//callback function for when someone in the pages loads the socket
io.on('connection', function(socket) {
  console.log("socket connection is working in ", socket.id);

  //listening to chat messages
  socket.on('chat', function(data) {
    //this sends data to EVERYONE!
    io.sockets.emit('chat', data);
  });

  //listening to typing messages
  socket.on('typing', function(data) {
    //this sends data to everyone EXCEPT THE CLIENT WHO FIRED THE EVENT
    socket.broadcast.emit('typing', data);
  });
  
});
