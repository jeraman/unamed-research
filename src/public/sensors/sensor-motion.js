/*===============================================================
= MOTION INPUT (ORIENTATION) ====================================
= https://developer.mozilla.org/en-US/docs/Web/API/Touch_events =
= jeraman, July 3, 2017 =========================================
=================================================================*/

//creates a return variable
function orientationStructure(event) {

  //creates a return variable
  var orientationData = {
    absolute: event.absolute,
    alpha:    event.alpha,
    beta:     event.beta,
    gamma:    event.gamma
  };

  return orientationData;
}

/////////////////////////////////////////////
//device orientation events
window.addEventListener("deviceorientation", function (event) {

  //sends toucharray to the server
  socket.emit('deviceorientation', orientationStructure(event));

}, true);
