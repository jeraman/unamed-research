/*===============================================================
= ACTUATOR RGB SCREEN  ==========================================
= https://www.w3schools.com/jsref/prop_style_background.asp =====
= jeraman, July 5, 2017 =========================================
=================================================================*/

var backgroundR;
var backgroundG;
var backgroundB;

//var backgroundEnabled = false;

//enables bakcground color control
//var startRGBScreen = function startRGBScreen() {
//  backgroundEnabled = true;
//}

//disables bakcground color control
function turnOffRGBScreen() {
  //backgroundEnabled = stop;
  document.body.style.backgroundColor = "black";
  backgroundR = 0;
  backgroundG = 0;
  backgroundB = 0;
}

//controls the rgb screen bakcground color control
function controlsRGBScreen(data) {

  if (hasPermissionToStart) {
    backgroundR = data.r;
    backgroundG = data.g;
    backgroundB = data.b;

    //converto to hex
    var r = (data.r).toString(16);
    var g = (data.g).toString(16);
    var b = (data.b).toString(16);

    //properly formats strings
    if (r.length == 1) r = "0"+r;
    if (g.length == 1) g = "0"+g;
    if (b.length == 1) b = "0"+b;

    //formats the "color" format
    var color = "#" + r.toString(16) +
                      g.toString(16) +
                      b.toString(16) ;

    //sets the color if background color activated
    //if (backgroundEnabled)
    //document.body.style.background = color;
    document.body.style.backgroundColor = color;
    //else
    //  document.body.style.backgroundColor = "black";

    return color;
  }
}

//registers the callback events
function registerCallbackRGBScreen() {
  socket.on('turnOffRGBScreen', turnOffRGBScreen);
  socket.on('controlsRGBScreen', controlsRGBScreen);
}
