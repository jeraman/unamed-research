//importing express
var express = require('express');

//importing our socket library
var socket  = require('socket.io');

//setting the express app
var app = express();

//creating my server
var server = app.listen(3000, function () {
  console.log("litening to port 3000!");
});

//sending everythin inside our public folder to the server
//question: can I send pictures as well? and p5.js files? and webpd files? movies?
app.use(express.static('public'));

//initing the sockets library for the server
var io = socket(server);

//callback function for when someone in the pages loads the socket
io.on('connection', function(socket) {
  //getting meta info about who made the connection
  console.log("socket connection is working!")
  console.log(" - socket id: ", socket.id);
  console.log(" - user-agent: ", socket.request.headers['user-agent']);
  console.log(" - ip address: ", socket.handshake.address);
  //console.log(" - hostname: ", socket.request.headers.hostname);


  //listening to fingerMove messages
  socket.on('touchmove', function(data) {
    console.log(socket.id);
    console.log(data);
  });

  //listening to orientation messages
  socket.on('deviceorientation', function(data) {
    //console.log(socket.id);
    //console.log(data);
  });

  //listening to mouse messages
  socket.on('mousemove', function(data) {
    console.log(socket.id);
    console.log(data);
  });

  //listening to keyboard messages
  socket.on('keypress', function(data) {
    console.log(socket.id);
    console.log(data);
  });


  /*
  socket.on('message', function(data,p2) {
    if ("mousemove" == action) {
       console.log(data);
    }
  });
  */
});
