/*===============================================================
= TOUCH INPUT ===================================================
= https://developer.mozilla.org/en-US/docs/Web/API/Touch_events =
= jeraman, July 3, 2017 =========================================
=================================================================*/

//creates a return variable
function touchStructure(event) {
  //prevents default to avoid mouse events
  //event.preventDefault();

  //creates a return variable
  var toucharray = [];

  //iterates over all touches
  for(var i=0;i<event.touches.length;i++) {
      //create a new obj for this touch
      var obj = {
        id: event.touches[i].identifier,
        touchX: event.touches[i].pageX,
        touchY: event.touches[i].pageY
      };

      //attaches the new obj to toucharray
      toucharray.push(obj);
  }

  return toucharray;
}


//callbacks emmiting... touch start
window.addEventListener("touchstart", function(event){
    var touch = touchStructure(event);
    socket.emit('touchstart', touch);
    //socket.emit('hasmouse', hasMouse());
}, false);

//touch move
window.addEventListener("touchmove", function(event){
    var touch = touchStructure(event);
    socket.emit('touchmove', touch);
    //socket.emit('hasmouse', hasMouse());
}, false);

//touch end
window.addEventListener("touchend", function(event){
    var touch = touchStructure(event);
    socket.emit('touchend', touch);
    //socket.emit('hasmouse', hasMouse());
}, false);
