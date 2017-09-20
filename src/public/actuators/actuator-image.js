/*===============================================================
= ACTUATOR IMAGE ON SCREEN  =====================================
= https://www.w3schools.com/jsref/prop_style_background.asp =====
= jeraman, July 5, 2017 =========================================
=================================================================*/


//hides the image form the screen
function hideImage(filename) {
  var img = document.getElementById(filename);
  if (img!=undefined && hasPermissionToStart)
    img.style.visibility = "hidden";
}

//diaplays the image on the screen
function displayImage(filename) {
  var img = document.getElementById(filename);
  if (img!=undefined && hasPermissionToStart)
    img.style.visibility = "visible";
}

//loads the image on the memory
function loadImage(filename) {
  var img = document.getElementById(filename);

  //if there is no such an image
  if (img==undefined) {
    img = document.createElement('img');

    img.setAttribute("id",filename);
    img.setAttribute("src",filename);
    img.setAttribute("width", "100%");
    img.setAttribute("height","100%");
    img.setAttribute("class","overlayImage");
    img.style.visibility = "hidden";

    document.body.appendChild(img);
  }
}

//controls the opacity of an filename
function changeImageOpacity(data) {
  var img = document.getElementById(data.filename);
  if (img!=undefined)
    img.style.opacity = data.value;
}

//registers the callback events
function registerCallbackImage() {
  socket.on('hideImage', hideImage);
  socket.on('displayImage', displayImage);
  socket.on('loadImage', loadImage);
  socket.on('changeImageOpacity', changeImageOpacity);
}
