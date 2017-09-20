# Actuator data
We are going to address here different actuator media.

The media we are covering will be:

# P5.js
This guy here will allow us to implement most of our examples!

Before starting, check [this tutorial](https://p5js.org/get-started/) to make sure P5.js is properly installed. In addition, make sure your structure is set according to the following code in order properly manage different screen sizes and device orientations on drawing.

```javascript
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
}

function draw() {
  /* draw code goes here*/
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
```

## Background color
Allows users to control the screen color—as if the screen was a RGB "pixel":
```javascript
//declaring color variables
var r = 255;
var g = 255;
var b = 255;

//callback function that reacts to mouse movement (normalized)
socket.on('colorchange', function(data) {
  //mouse data needs to be properly normalized before being sent
  r = data.x*255;
  g = data.x*255;
  b = data.y*255;
});

//draw function
function draw() {
  background(r, g, b);
}
```

## Picture
Allows users to display fullscreen pictures in the device screen, and control its opacity:
```javascript
//var to store the image array
var img;

//var that stores the index of the image
var index;

//var that stores the image's opacity
var opacity;

//loading an array of images
function preload() {
  index = 0;

  //these images need to be stored inside public
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
function inc_index() {
  index = (index+1)%img.length;
}

//callback for changing the image index on mouseclick
socket.on('click', function(data) {
  inc_index();
});

//callback function that changes opacity according to mouse movement
socket.on('colorchange', function(data) {
  //mouse data needs to be properly normalized before being sent
  opacity = data.x*255;
});

//draw image method
function draw_image() {
  background(0);
  tint(255, opacity);
  image(img[index], 0, 0, window.innerWidth, window.innerHeight);
}
```

## Videos
Allows users to display fullscreen videos in the device screen, and basic control such as play, pause, stop, and play speed:

```javascript
//var to store the image array
var video;

//var that stores the index of the image
var v_index;

//loading an array of images
function preload() {
  v_index = 0;
  video = [
    createVideo(["movie1.mp4", "movie1.webm"]),
    createVideo(["movie2.mp4", "movie2.webm"])
  ]

  //hiding the html5 element of the video
  for (i = 0; i < video.length; i++)
    video[i].hide();

  video[v_index].loop();
}

//function to increment the index
function inc_v_index() {
  //stoping the old video
  video[v_index].pause();
  //incrementing the index
  v_index = (v_index+1)%video.length;
  //looping the new video
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
  //if user clicked left button
  if (data.btn == LEFT)
    play_stop();
  //if user clicked another button
  else
    inc_v_index();
});

//callback for the play speed
socket.on('mousemove', function(data) {
  //above the value of 2, the iPad is not able to display the result properly
  video[v_index].speed(data.y*2);
});

//draw image method
function draw() {
  background(0);
  tint(255, r);
  image(video[v_index], 0, 0, window.innerWidth, window.innerHeight);
}
```
Please, note that dealing with video actuators is unstable and a bit different when compared to the previous actuators. For example:

Videos are initially "drawn" outside the scope of the canvas, in native HTML5 <video> element. In this case, you can hide this HTML5 video element by:

```javascript
//loading the video
var video = createVideo(["movie.mov"]);

//hiding the html5 video element
video.hide();

draw() {
  //printing the video as if it was an image
  image(video, 0, 0);
}
```

Browsers' support to different video formats seems also to be a mess. To avoid problems, it is recommended to export the same video to different formats, such as .mov, .mp4, and .webm, and to make use of the multiple parameters of the createVideo function, as follows:

```javascript
var video = createVideo(["movie.mov", "movie.mp4", "movie.webm"]);
```
In this case, the browser will first try to load "movie.mov". If there is no support to this format, the browser will then try to load "movie.mp4". Finally, in case of error, the browser will try to load the file "movie.webm".

Finally, I *couldn't* get movie2 to run on the iPad and both videos in my Moto3G device.

See [this link](http://creative-coding.decontextualize.com/video/) for further info on dealing with video.

### Problem
Video seems to be working all right in my Moto 3G device. Check for instance how smooth video runs in this page:

https://www.quirksmode.org/html5/tests/video.html

Maybe it is an issue with P5.js?



## Sound play
Allows users to play sound files (e.g. mp3, wav), as well as basic operation into this file, such as play/stop, volume, and pan.

## Vibration
Allows users to control vibration.

## Custom visuals (custom P5.js)
Allows users to updaload custom Processing (P5.js) code into the clients

## Custom sound (webPd)
Allows users to upload custom Pd patches to the clients via WebPd.
