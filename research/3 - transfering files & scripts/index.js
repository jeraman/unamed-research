
//importing express
var express = require('express');

//setting the express app
var app = express();

//creating my server
var server = app.listen(3000, function () {
  console.log("listening to port 3000!");
});

//question: can I send pictures as well? and p5.js files? and webpd files? movies?
app.use(express.static('public'));
