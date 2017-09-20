/////////////////////////
//client side js files
var socket = io.connect("http://192.168.2.17:3000");


function preload() {
  preload_image();
  preload_video();
}

function setup() {
  //this canvas needs to change according to the orientation of the device
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
}

function draw() {
  //draw_backgroundColorChange();
  //draw_image();
  draw_video();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function mouseMoved() {
  socket.emit('mousemove', {
    x: (mouseX/displayWidth),
    y: (mouseY/displayHeight)
  });
}

function mousePressed() {
  socket.emit('click', {
    btn: mouseButton,
    x: (mouseX/displayWidth),
    y: (mouseY/displayHeight)
  });
}

/*
//////////////////////////////////////////////
//mouse event used as an example for the control
window.addEventListener("mousemove", function(event){

  //creates a return variable
  var mousepos = {
    button: event.buttons,
    aux_button:  event.button,
    //normalize mouse coordinates
    x: (event.clientX/displayWidth),
    y: (event.clientY/displayHeight)
    //x: event.clientX,
    //y: event.clientY
  };
    //socket.send('mousemove', event.clientX+':'+event.clientY);
    socket.emit('mousemove', mousepos);
});

//////////////////////////////////////////////
//mouse click event used as an example for the control
window.addEventListener("mousedown", function(event){

  //creates a return variable
  var mousepos = {
    button: event.buttons,
    aux_button:  event.button,
    //normalize mouse coordinates
    x: (event.clientX/displayWidth),
    y: (event.clientY/displayHeight)
    //x: event.clientX,
    //y: event.clientY
  };
    //socket.send('mousemove', event.clientX+':'+event.clientY);
    socket.emit('click', mousepos);
});
*/

/********************************************
*********************************************
** actuators!!! *****************************
*********************************************
********************************************/

///////////////////////////////////
///////////////////////////////////
// Background pixel actuator

//declaring color variables
var r = 255;
var g = 255;
var b = 255;

//callback
socket.on('mousemove', function(data) {
  //mouse data needs to be properly normalized before being sent
  r = data.x*255;
  g = data.x*255;
  b = data.y*255;
});

//draw function
function draw_backgroundColorChange() {
  background(r, g, b);
}

///////////////////////////////////
///////////////////////////////////
// image actuator
//var to store the image array
var img;

//var that stores the index of the image
var img_index;

//loading an array of images
function preload_image() {
  img_index = 0;

  img = [
    loadImage("image1.png"),
    loadImage("image2.png"),
    loadImage("image3.png"),
    loadImage("image4.png"),
    loadImage("image5.png"),
    loadImage("image6.png")
  ]
}


//function to increment the index
function inc_img_ndex() {
  img_index = (img_index+1)%img.length;
}

//callback for changing the image
socket.on('click', function(data) {
  inc_img_ndex();
});


//draw image method
function draw_image() {
  background(0);
  tint(255, r);
  image(img[img_index], 0, 0, window.innerWidth, window.innerHeight);
}

///////////////////////////////////
///////////////////////////////////
// video actuator
//var to store the image array
var video;

//var that stores the index of the image
var v_index;

//callback that counts how many videos are ready to go
var ready_counter = 0;

//stores when the video has loaded
var v_loaded = false;

//loading an array of images
function preload_video() {
  v_index = 0;

  video = [
    createVideo(["movie1.mp4", "movie1.webm"]),
    createVideo(["movie2.mp4", "movie2.webm"])
  ];

  //hiding the html5 element of the video
  for (i = 0; i < video.length; i++) {
    video[i].hide();
    video[i].volume(0);
  }

  //video[v_index].play();
  video[v_index].loop();

}

/*
//callback function called when a video has finished loading
function ready () {
  ready_counter = ready_counter+1;

  //waiting for all videos to be ready
  if (ready_counter == video.length) {
    v_loaded = true;

    //hiding the html5 element of the video
    for (i = 0; i < video.length; i++)
      video[i].hide();

    //video[v_index].play();
    video[v_index].loop();
  }
}
*/

//function to increment the index
function inc_v_index() {
  //stoping the old video
  video[v_index].pause();
  //incrementing the index
  v_index = (v_index+1)%video.length;
  //looping the new video
  //video[v_index].play();
  video[v_index].loop();
}

//var to check if the video is currently playing or not
var playing = false;

//function that controls play stop
function play_stop() {
  if(playing) {
    //video[v_index].play();
    video[v_index].loop();
  } else
    video[v_index].pause();

  playing = !playing;
}

//callback for the play stop
socket.on('click', function(data) {
  //if (!v_loaded) return;

  if (data.btn == LEFT)
    play_stop();
  else
    inc_v_index();
});

//callback for the play speed
socket.on('mousemove', function(data) {
  //if (!v_loaded) return;
  //above the value of 2, the iPad is not able to display the result properly
  //video[v_index].speed(data.y*2);
});

//draw image method
function draw_video() {
  //if (!v_loaded) return;

  background(0);
  //tint(255, r);
  image(video[v_index], 0, 0, window.innerWidth, window.innerHeight);
  //image(video, 0, 0, window.innerWidth, window.innerHeight);
}
