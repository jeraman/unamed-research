
/* =====================================
= CORE =================================
=======================================*/

//importing express
var express = require('express');

//setting the express app
var app = express();

//creating my server
var server = app.listen(3000, function () {
  console.log("listening to port 3000!");
});

//importing our socket library
var socket  = require('socket.io');

//sharing folder with clients
app.use(express.static('public'));

//initing the sockets library for the server
var io = socket(server);



/* =====================================
= TESTING CALLBACK FUNCTIONS ===========
=======================================*/

//function that loads the server
function sendMediaToClients() {

  io.sockets.emit("loadVideo", "assets/movie2.mp4");
  io.sockets.emit("loadVideo", "assets/movie1.mp4");
  io.sockets.emit("loadImage", "assets/image1.png");
  //io.sockets.emit("loadAudio", "assets/audio1.mp3");
  //io.sockets.emit("loadAudio", "assets/audio2.mp3");

}

function change(data) {
  io.sockets.emit("controlsRGBScreen", {
    r: Math.round(data.x*255),
    g: Math.round(data.y*255),
    b: 0
  });


  io.sockets.emit("changeImageOpacity", {
    filename: "assets/image1.png",
    value: data.x
  });


  io.sockets.emit("changeVideoOpacity", {
    filename: "assets/movie1.mp4",
    value: data.x
  });

  io.sockets.emit("changeVideoPlaybackRate", {
    filename: "assets/movie1.mp4",
    value: (data.y*2)
  });

  /*
  io.sockets.emit("changeAudioVolume", {
    filename: "assets/audio1.mp3",
    value: data.x
  });

  io.sockets.emit("changeAudioPlaybackRate", {
    filename: "assets/audio1.mp3",
    value: (data.y*2)
  });
  */
}

//callback function for when someone in the pages loads the socket
io.on('connection', function(socket) {
  console.log("socket connection is working!")
  console.log(" - socket id: ", socket.id);
  console.log(" - user-agent: ", socket.request.headers['user-agent']);
  console.log(" - ip address: ", socket.handshake.address);

  //listening to init messages
  socket.on('requestMedia', sendMediaToClients);

  //listening to mouse messages
  socket.on('click', function(data) {
    console.log("mouse clicked at x: " +data.x+ " y: " + data.y + " btn: "+ data.btn);
    io.sockets.emit("turnOffRGBScreen", {});
    io.sockets.emit("vibrate", 100);
    io.sockets.emit("displayVideo", "assets/movie1.mp4");
    io.sockets.emit("displayVideo", "assets/movie2.mp4");
    io.sockets.emit("displayImage", "assets/image1.png");
    //io.sockets.emit("playAudio", "assets/audio1.mp3");
    //io.sockets.emit("playAudio", "assets/audio2.mp3");
    io.sockets.emit("playVideo", "assets/movie1.mp4");
    io.sockets.emit("playVideo", "assets/movie2.mp4");

  });

  //listening to mouse messages
  socket.on('mousemove', function(data) {
    console.log("mouse moved at x: " +data.x+ " y: " + data.y + " btn: " + data.btn);
    change(data);
  });

  //listening to touch messages
  socket.on('touchstart', function(data) {
    console.log("touch started!");
    console.log(data);
  });

  //listening to touch messages
  socket.on('touchmove', function(data) {
    console.log("touch moved!");//+data[0].x+ " y: " + data[0].y);
    console.log(data);
  });

  //listening to touch messages
  socket.on('touchend', function(data) {
    console.log("touch ended!");// +data[0].x+ " y: " + data[0].y);
    console.log(data);
  });

  //listening to orientation messages
  socket.on('deviceorientation', function(data) {
    console.log("device orientation!");// +data[0].x+ " y: " + data[0].y);
    console.log(data);
  });

});
