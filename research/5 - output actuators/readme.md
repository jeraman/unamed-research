# Actuators
Here, we explore videos in native HTML5+Css+Js. The result so far seems more promising than using P5.js.

## Videos
Most part of the code here is hosted in the HTML file:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>P5.js</title>

    <style type="text/css">
      /*********************************
      ** video fluid width and height
      ** from: https://envato.com/blog/video-background-html5-video/
      **********************************/
      .video {
        position: fixed;
        top: 50%; left: 50%;
        z-index: 1;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>

  <body>

    <video id="movie1" class="video" loop="1" width="100%" height="100%" muted="1">

    </video>

  </body>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>
  <script src="client.js"></script>

</html>
```

The video "movie1" can than be easily manipulated in Javascript as follows:
```javascript
/////////////////////////
//client side js files
var socket = io.connect("http://192.168.2.17:3000");

var vid = document.getElementById("movie1");

//callback for the play stop
socket.on('mousemove', function(data) {
  vid.playbackRate = data.x*2;
});

//callback for the play stop
socket.on('mousedown', function(data) {
  play_stop();
});

//var to check if the video is currently playing or not
var playing = false;

//function that controls play stop
function play_stop() {
  if(playing) {
    //video[v_index].play();
    vid.play();
  } else
    vid.pause();

  playing = !playing;
}

//////////////////////////////////////////////
//mouse events
window.addEventListener("mousemove", function(event){
  //creates a return variable
  var mousepos = {
    button: event.buttons,
    aux_button:  event.button,
    x: (event.clientX/screen.width),
    y: (event.clientY/screen.height),
};
    socket.emit('mousemove', mousepos);
});

window.addEventListener("mousedown", function(event){
  //creates a return variable
  var mousepos = {
    button: event.buttons,
    aux_button:  event.button,
    x: event.clientX,
    y: event.clientY,
};
    socket.emit('mousedown', mousepos);
});

```

## Audio
Similar to the video. We use an HTML file:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>P5.js</title>
  </head>

  <body>

    <audio id="audio1" loop="1">

    </audio>

  </body>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>
  <script src="client.js"></script>

</html>
```

Plus the client.js:

```javascript
//loads the video element
var aud;

//loads the name of the files
var audioSource = new Array();
audioSource[0]='audio1.mp3';
audioSource[1]='audio2.mp3';
audioSource[2]='audio3.mp3';

//index that stores the current video
var aindex;

function initAudio() {
  //if audio is not defined, init
  if (aud==undefined) {
    aindex = 0;
    setAudio();
  }
}

function setAudio() {
  aud = document.getElementById("audio1");
  aud.setAttribute("src",audioSource[aindex]);
  aud.setAttribute("autoplay","1");
  aud.load();
}

//function to increment the index
function nextAudio() {
  //incrementing the index
  aindex = (aindex+1)%audioSource.length;
  //seting the next video
  setAudio(aindex);
  //looping the new video
  aud.play();

}

//changes the volume
function controlVolume(value) {
  if (aud!=undefined)
    aud.volume = value;
}

//function that controls play stop
function play_stop_audio() {
  if (aud!=undefined) {
    if(playing)
      aud.play();
     else
      aud.pause();
  }
}

//events for initializing audio on mobile devices
window.addEventListener('touchstart', function(event) {
  //PROBLEM: in my android device, calling init() inside both mousedown and touchstart at the same time cancels the sound
  //because of this, I need to check if we are on an android phone (from: https://davidwalsh.name/detect-android) before calling init()
  var ua = navigator.userAgent.toLowerCase();
  var isAndroid = ua.indexOf("android") > -1;
  if(!isAndroid)
    initAudio();
}, false);

window.addEventListener("mousedown", function(event){
  initAudio();
});

/*==================================
= CALLBACKS ========================
==================================*/
window.addEventListener("mousemove", function(event){
  //creates a return variable
  var mousepos = {
    button: event.buttons,
    aux_button:  event.button,
    x: (event.clientX/screen.width),
    y: (event.clientY/screen.height)
};
    socket.emit('mousemove', mousepos);
});

window.addEventListener("mousedown", function(event){
  //creates a return variable
  var mousepos = {
    button: event.buttons,
    aux_button:  event.button,
    x: event.clientX,
    y: event.clientY,
};
    socket.emit('mousedown', mousepos);
});

```


## Vibration
Vibration is straightforward via the [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API):

```javascript
//starting a vibration
function vibrate (duration) {
  window.navigator.vibrate(duration);
}

//stoping any on going vibration
function stopVibration () {
  window.navigator.vibrate(0);
}

socket.on('mousedown', function(data) {
  vibrate(100);
});
```

The only thing that I need to take care is about the position the 'vibrate(Number)' is called in certain devices that do not support vibration. For example, in my iPad:

```javascript
socket.on('mousedown', function(data) {
  vibrate(100);
  console.log("hey!");
});
```

Won't print "hey!" because it is after the 'vibrate(Number)' command. On the other hand:
```javascript
socket.on('mousedown', function(data) {
  console.log("hey!");
  vibrate(100);
});
```
Will print "hey!" as expected.

## Fullscreen & Autoplay on mobile
Fullscreen and audio autoplay can't be automatically activated unless there is an express action by the user (e.g. a click). However, there are some potential ways to overcome this limitation.

An initial solution would involve start the code after a user action (e.g. clicking). Thus, whenever the user clicks on the page, this page becomes fullscreen, and audiovisuals are enabled. See [this link](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html) for further info. This is the approach I took.

The second approach would involve trying to replicate WebPD. Not sure how WebPD deals with this issue. See [this text here](https://github.com/sebpiq/WebPd#i-cant-run-any-webpd-demo-on-my-computer):
```
On iPhone and iPad, you need to use the Pd.startOnClick helper, otherwise the sound will not work.
```

Finally, for an experimental approach on how to force fullscreen, check [this link](https://stackoverflow.com/questions/29281986/run-a-website-in-fullscreen-mode/30970886#30970886).


## Running P5.js and WebPd sketches dynamically
Ideally, the user will be able to upload custom P5.js and WebPd code as actuators.

For this, we'll need to use a solution inspired on [this one](http://creative-coding.decontextualize.com/first-steps/). On that page, the author can play/stop external P5.js code by using buttons (here the "run sketch" and "stop sketch") that can dynamically show/hide iframes (inspect the code for details). In our case, we'll need to replace the buttons by custom events from the server.
