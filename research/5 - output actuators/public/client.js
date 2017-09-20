/////////////////////////
//client side js files
var socket = io.connect("http://192.168.2.17:3000");


/*==================================
= VIDEO ============================
==================================*/
//sets the background color to black
document.body.style.backgroundColor = "black";

//loads the video element
var vid;

//loads the name of the files
var videoSource = new Array();
videoSource[0]='movie1.mp4';
videoSource[1]='movie2.mp4';

//index that stores the current video
var vindex;

//initializing the video
function initVideo() {
  //if audio is not defined, init
  if (vid==undefined) {
    vindex = 0;
    setVideo();
  }
}

//setting the video
function setVideo() {
  vid = document.getElementById("movie1");
  vid.setAttribute("src",videoSource[vindex]);
  vid.setAttribute("autoplay","1");
  vid.load();
}

//function to increment the index
function nextVideo() {
  //stoping the old video
  vid.pause();
  //incrementing the index
  vindex = (vindex+1)%videoSource.length;
  //seting the next video
  setVideo(vindex);
  //looping the new video
  vid.play();
}


//function that controls play stop video
function play_stop_video() {
  if (vid != undefined){
    if(playing)
      vid.play();
    else
      vid.pause();
  }
}

//value that changes the opacity of the video
function changeOpacity(value) {
  //if there is a video
  if (vid != undefined)
    vid.style.opacity = value;
    //var hundredTimesValue=value*100;
    //vid.setAttribute("style", "opacity:"+value+"; -moz-opacity:"+value+"; filter:alpha(opacity="+hundredTimesValue+");");
}

//value that changes the opacity of the video
function changePlaybackRate(value) {
  //if there is a video
  if (vid != undefined)
    vid.playbackRate= value;
}


/*==================================
= VIBRATION ========================
==================================*/

//starting a vibration
function vibrate (duration) {
  window.navigator.vibrate(duration);
}

//stoping any on going vibration
function stopVibration () {
  window.navigator.vibrate(0);
}

/*
//callback for the play stop
socket.on('mousedown', function(data) {
//vibrate
  vibrate(100);
});
*/

/*==================================
= SOUND ========================
==================================*/
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

/*==================================
= MAIN CONTROL METHODS =============
====================================*/

//var to check if the video is currently playing or not
var playing = false;

//function that controls play stop
function play_stop() {
  playing = !playing;
  play_stop_video();
  play_stop_audio();
}

//function that controls the next
function next() {
  nextVideo();
  nextAudio();
}

//function that controls the next
function init() {
  initVideo();
  initAudio();
}

//callback for the play stop
socket.on('mousedown', function(data) {
  //if left button, pause
  if (data.button == 1)
    play_stop();
  //otherwise, change video
  else
    next();

  //PROBLEM: this needs to be on the last position. otherwise, error on the ipad and the rest of the code don't get executed!
  vibrate(100);
});

//callback for the play stop
socket.on('mousemove', function(data) {
  changePlaybackRate(data.x*2);
  //PROBLEM: video opacity seems to pose slowness to the ipad.
  changeOpacity(data.x);
  controlVolume(data.x);
});

//events for initializing audio on mobile devices
window.addEventListener('touchstart', function(event) {
  //PROBLEM: in my android device, reacting to both mousedown and touchstart at the same time cancels the sound
  //because of this, I need to check we are on an android phone (from: https://davidwalsh.name/detect-android)
  var ua = navigator.userAgent.toLowerCase();
  var isAndroid = ua.indexOf("android") > -1;
  if(!isAndroid)
    init();
}, false);

window.addEventListener("mousedown", function(event){
  init();
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


function fullscreen() {
  if (vid.requestFullscreen) {
    vid.requestFullscreen();
  } else if (vid.mozRequestFullScreen) {
    vid.mozRequestFullScreen();
  } else if (vid.webkitRequestFullscreen) {
    vid.webkitRequestFullscreen();
  }
}
