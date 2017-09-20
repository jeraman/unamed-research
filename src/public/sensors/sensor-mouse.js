/*=============================================================
= MOUSE INPUT =================================================
= https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent =
= jeraman, July 3, 2017 =======================================
==============================================================*/

//creates a return variable
function mouseStructure(event) {
  var mouse = {
    btn: event.which,
    x: (event.clientX/window.innerWidth),
    y: (event.clientY/window.innerHeight)
  };
  return mouse;
}

//callbacks emmiting mouse move events
window.addEventListener("mousemove", function(event){
    var mouse = mouseStructure(event);
    socket.emit('mousemove', mouse);
    //socket.emit('hasmouse', hasMouse());
});

//emits click events
window.addEventListener("click", function(event){
  var mouse = mouseStructure(event);
  socket.emit('click', mouse);
});
