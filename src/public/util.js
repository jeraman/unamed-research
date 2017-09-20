/*===============================================================
= SOME USEFUL FUNCTIONS =========================================
=================================================================
= jeraman, July 6, 2017 =========================================
=================================================================*/

//returns if this is a ios device
function isIOS() {
  return (navigator.platform == "iPad" || navigator.platform == "iPhone");
}

//returns if this is a android device
//PROBLEM: in my android device, reacting to both mousedown and touchstart at the same time cancels the sound
//because of this, I need to check we are on an android phone (from: https://davidwalsh.name/detect-android)
function isAndroid() {
  var ua = navigator.userAgent.toLowerCase();
  return (ua.indexOf("android") > -1);
}
