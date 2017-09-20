/*===============================================================
= ACTUATOR VIDEO ON SCREEN  =====================================
= https://www.w3schools.com/tags/ref_av_dom.asp =================
= jeraman, July 5, 2017 =========================================
=================================================================*/

//hides the video form the screen
function hideVideo(filename) {
  var vid = document.getElementById(filename);
  if (vid!=undefined && hasPermissionToStart)
    vid.style.visibility = "hidden";
}
//IOS only supports playingone video at time
//diaplays the video on the screen
function displayVideo(filename) {
  var vid = document.getElementById(filename);
  if (vid!=undefined && hasPermissionToStart)
    vid.style.visibility = "visible";
}

//loads the video on the memory
function loadVideo(filename) {
  var vid = document.getElementById(filename);

  //if there is no such a video
  if (vid==undefined) {
    vid = document.createElement('video');
    vid.setAttribute("id",filename);
    vid.setAttribute("src",filename);
    vid.setAttribute("class","video");
    //vid.setAttribute("class","video multimedia");
    //vid.setAttribute("autoplay","1");
    vid.setAttribute("loop","1");
    vid.setAttribute("muted","1");
    //vid.setAttribute("preload","auto");

    vid.style.visibility = "hidden";

    document.body.appendChild(vid);
  }
}

//plays a video an filename
function playVideo(filename) {
  var vid = document.getElementById(filename);
  if (vid!=undefined && hasPermissionToStart)
    vid.play();
}

//stops a video filename
function pauseVideo(filename) {
  var vid = document.getElementById(filename);
  if (vid!=undefined && hasPermissionToStart)
    vid.pause();
}

//controls the opacity of an filename
function changeVideoOpacity(data) {
  var vid = document.getElementById(data.filename);
  if (vid!=undefined)
    vid.style.opacity = data.value;
}

//value that changes the playback rate of the video
function changeVideoPlaybackRate(data) {
  var vid = document.getElementById(data.filename);
  if (vid!=undefined)
    vid.playbackRate= data.value;
}

//registers the callback events
function registerCallbackVideo() {
  socket.on('hideVideo', hideVideo);
  socket.on('displayVideo', displayVideo);
  socket.on('loadVideo', loadVideo);
  socket.on('playVideo', playVideo);
  socket.on('pauseVideo', pauseVideo);
  socket.on('changeVideoOpacity', changeVideoOpacity);
  socket.on('changeVideoPlaybackRate', changeVideoPlaybackRate);
}
