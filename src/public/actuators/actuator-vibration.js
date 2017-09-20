/*================================================================
= ACTUATOR VIBRATION  ============================================
= https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API =
= jeraman, July 5, 2017 ==========================================
==================================================================*/

var vibrationDuration;

//stoping any on going vibration
function stopVibration () {
  window.navigator.vibrate(0);
}

//starting a vibration
function vibrate (duration) {
  //if has the permition to start
  if (hasPermissionToStart) {
    vibrationDuration = duration;
    window.navigator.vibrate(duration);
  }
}

//registers the callback events
function registerCallbackVibration() {
  //if vibration is available for this client
  //alert(Modernizr.vibrate);
  //if (Modernizr.vibrate) {
    socket.on('stopVibration', stopVibration);
    socket.on('vibrate', vibrate);
  //}
}
