/////////////////////////
//client side js files
var socket = io.connect("http://localhost:3000");

//query dom; getting webpage ui elements
var message   = document.getElementById('message');
var handle    = document.getElementById('handle');
var button    = document.getElementById('send');
var output    = document.getElementById('output');
var feedback  = document.getElementById('feedback');

//emit events
button.addEventListener('click', function() {
  socket.emit('chat',{
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value);
})

//listen for events
socket.on('chat', function(data) {
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ': ' + data.message + '</p>';
});

//listen for events
socket.on('typing', function(data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>';
});
