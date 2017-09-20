/////////////////////////
//client side js files
var socket = io.connect("http://192.168.2.17:3000");

//query dom; getting webpage ui elements
//var touchapp   = document.getElementById("touchapp");

//////////////////////////////////////////////
//touch emit events
window.addEventListener('touchmove', function(event) {

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

  //sends toucharray to the server
  socket.emit('touchmove', toucharray);

}, false);


/////////////////////////////////////////////
//device orientation events
window.addEventListener("deviceorientation", function (event) {
  //creates a return variable
  var orientationData = {
    absolute: event.absolute,
    alpha:    event.alpha,
    beta:     event.beta,
    gamma:    event.gamma
  };

  //sends toucharray to the server
  socket.emit('deviceorientation', orientationData);

}, true);



//////////////////////////////////////////////
//mouse events
window.addEventListener("mousemove", function(event){
  //creates a return variable
  var mousepos = {
    button: event.buttons,
    aux_button:  event.button,
    x: event.clientX,
    y: event.clientY,
};
    //socket.send('mousemove', event.clientX+':'+event.clientY);
    socket.emit('mousemove', mousepos);
});


//////////////////////////////////////////////
//keyboard events
window.addEventListener("keypress", function(event){
  //creates a return variable
  var key = {
    key : event.key,
    keyCode: event.keyCode
    //altKey: event.altKey,
    //ctrlKey: event.ctrlKey
  };
    //socket.send('mousemove', event.clientX+':'+event.clientY);
    socket.emit('keypress', key);
});
