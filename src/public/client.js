/////////////////////////
//client side js files
var socket = io.connect("http://192.168.2.17:3000");

//initing the background as black
document.body.style.backgroundColor = "black";

//registering all callbacks
registerCallbackForActuators();

//requesting the server to send the necessary media (images, and sound)
socket.emit('requestMedia', {});

////////////////////////////////
// DAMN BUG ON LOADING SOUNDS!
// further info on:
// https://stackoverflow.com/questions/32424775/failed-to-execute-play-on-htmlmediaelement-api-can-only-be-initiated-by-a-u/32571967#32571967
// https://github.com/vimeo/player.js/issues/31
// solved by commenting the line:
//       event.preventDefault();
// from the file "sensor-touch.js"
// in addition, I've removed the event ontouchstart from the button.
//
// REAL PROBLEM: in my android device, reacting to both mousedown and touchstart at the same time cancels the sound
// because of this, I need to check we are on an android phone (from: https://davidwalsh.name/detect-android)

var hasPermissionToStart = false;

//initializing this client
function loadMedia() {

  //all media that needs to be played are initialized via user gesture here
  var mms = document.getElementsByClassName("multimedia");

  console.log(mms.length);

  for (i = 0; i < mms.length; i++) {
    console.log(mms[i]);
    mms[i].play();
    mms[i].pause();
  }

  var btn = document.getElementById("start");
  btn.style.visibility = "hidden";

  hasPermissionToStart = true;
}

//function to be called in the begining that registers all callbacks for actuators
function registerCallbackForActuators() {
  registerCallbackRGBScreen();
  registerCallbackVibration();
  registerCallbackImage();
  registerCallbackVideo();
  registerCallbackAudio();
}

//alert(navigator.platform);

//gets all necessary features supported by this client
function getClientInfo() {
  var description = {
      deviceModel: Detectizr.device.model,
      deviceType: Detectizr.device.type,
      browser:  Detectizr.browser.name,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      //infra
      websockets: Modernizr.websockets,
      //sensors
      touchevents: Modernizr.touchevents,
      deviceorientation: Modernizr.deviceorientation,
      devicemotion: Modernizr.devicemotion,
      //actuators
      video: Modernizr.video,
      fullscreen: Modernizr.fullscreen,
      audio: Modernizr.audio,
      vibration: Modernizr.vibrate
  };

  return description;
}

//if possible, asking for fullscreen. see more on:
//https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
function fullscreen() {
  if (document.body.requestFullscreen) {
    document.body.requestFullscreen();
  } else if (document.body.mozRequestFullScreen) {
    document.body.mozRequestFullScreen();
  } else if (document.body.webkitRequestFullscreen) {
    document.body.webkitRequestFullscreen();
  }
}
