/*===============================================================
= ACTUATOR AUDIO (MP3) ==========================================
= https://www.w3schools.com/tags/ref_av_dom.asp =================
= jeraman, July 5, 2017 =========================================
=================================================================*/

/*
var audiofiles = new Array();

function loadAudio(filename) {
  if(!audiofiles.includes(filename))
    audiofiles.push(filename);
}
*/

//loads the Audio on the memory
function loadAudio(filename) {
  var aud = document.getElementById(filename);

  //if there is no such a Audio
  if (aud==undefined) {
    aud = document.createElement('audio');
    aud.setAttribute("id",filename);
    aud.setAttribute("src",filename);
    aud.setAttribute("class","multimedia");
    //aud.setAttribute("autoplay","1");
    aud.setAttribute("loop","1");
    aud.setAttribute("preload","auto");
    //aud.setAttribute("controls","1");
    //aud.style.visibility = "hidden";

    document.body.appendChild(aud);
  }
}

//plays a Audio an filename
function playAudio(filename) {
  var aud = document.getElementById(filename);
  if (aud!=undefined && hasPermissionToStart)
    aud.play();
}

//stops a Audio filename
function pauseAudio(filename) {
  var aud = document.getElementById(filename);
  if (aud!=undefined && hasPermissionToStart)
    aud.pause();
}

// ios does not support dynamic change of playback speed of any media
// ios does not support dynamic volume change (nothing happens) of any media
// see this link for further info:
// https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW8

function changeAudioVolume(data) {
  console.log("changeAudioVolume " + data.filename + ", " + data.value);
  var aud = document.getElementById(data.filename);
  if (aud!=undefined && !isIOS())
    aud.volume = data.value;
}

//value that changes the playback rate of the video
function changeAudioPlaybackRate(data) {
  var aud = document.getElementById(data.filename);
  if (aud!=undefined && !isIOS())
    aud.playbackRate= data.value;
}


//registers the callback events
function registerCallbackAudio() {
  socket.on('loadAudio', loadAudio);
  socket.on('playAudio', playAudio);
  socket.on('pauseAudio', pauseAudio);
  socket.on('changeAudioVolume', changeAudioVolume);
  socket.on('changeAudioPlaybackRate', changeAudioPlaybackRate);
}
