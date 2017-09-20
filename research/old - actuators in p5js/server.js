
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

//question: can I send pictures as well? and p5.js files? and webpd files? movies?
app.use(express.static('public'));

//initing the sockets library for the server
var io = socket(server);

//callback function for when someone in the pages loads the socket
io.on('connection', function(socket) {
  console.log("socket connection is working!")
  console.log(" - socket id: ", socket.id);
  console.log(" - user-agent: ", socket.request.headers['user-agent']);
  console.log(" - ip address: ", socket.handshake.address);

  //emiting fullscreen
  io.sockets.emit('fullscreen');

  //listening to mouse messages
  socket.on('mousemove', function(data) {
    //emiting the color change to everyone
    io.sockets.emit('mousemove', data);
  });

  //listening to mouse messages
  socket.on('click', function(data) {
    //emiting the color change to everyone
    io.sockets.emit('click', data);
  });

});
