# Node.js
## Getting started (1 - first test)
Node.js is the architecture that seems to allow me to build the distributed "media client" for the ZenStates.

This video tutorial covers installation and a simple server:
https://www.youtube.com/watch?v=Ts0-cLiPUdk

For a more detailed tutorial, check this video playlist:
https://www.youtube.com/watch?v=86tgU7UaJmU&index=3&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp

I particularly recommend to go over videos #1 to #7 in order to get an overview of node.js's key functionalities.

## Communication Server-Client (2 - socket.io)
Ultimately, we want data to be sent to and from the client (i.e. server-client communication). This will allow us, for instance, to send data from sensors, or to display one rgb color in the display.

There are different ways to implement this communication. In my case, I've used  [Websockets](https://en.wikipedia.org/wiki/WebSocket)—a low latency communication protocol, check [here](https://www.html5rocks.com/pt/tutorials/websockets/basics/) for a tutorial—via the library [Sockets.io](https://sockets.io).

### Sockets.io
Library that implements websockets to make the usage of sockets easier, faster, and (it seems so) multimedia-friendly. See this example:

https://socket.io/get-started/chat/

This seems to be the way to go because it's easy & straightforward to use, fast, and reliable ;)
https://stackoverflow.com/questions/25023118/is-socket-io-a-reliable-chat-server-for-large-number-of-users-if-yes-whats-you

For a detailed tutorial, check:
https://www.youtube.com/playlist?list=PL4cUxeGkcC9i4V-_ZVwLmOusj8YAUhj_9

### Other solutions
#### Buffers, Streams, and Pipes
General info on the architecture:
https://www.youtube.com/watch?v=GlybFFMXXmQ

Readable and writable streams
Allows data streams to be read and written to a file:
https://www.youtube.com/watch?v=DvlCT0N7yQI
https://www.youtube.com/watch?v=E3tTzx0Qoj0

Sending data to clients using pipes
https://www.youtube.com/watch?v=a8W90jDHSho

+ Low level (natively supported by node.js);
+ Allows to send streams of data (instead of single files)
- Probably you'd need to add support to complex media (such as audio & video) by yourself;

## Transfering files to the client: is it possible? (3 - transfering files & scripts)
In theory, yes. You can do this by using [static files support in Express](http://expressjs.com/en/starter/static-files.html) as follows:
```
app.use(express.static('public'))
```

Alternatively, you can send custom-format files using sendFile:
https://expressjs.com/en/api.html#res.sendFile

Alternatively, you can read and write files natively in Node.js as shown here:
https://www.youtube.com/watch?v=U57kU311-nE&index=9&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp

Further research needed on how this is going to be implemented in our application.

## Gathering sensor data
There are a bunch of examples available on the internet! For instance:

### Touchscreen data (including multitouch):
https://mobiforge.com/design-development/html5-mobile-web-touch-events

### Device orientation (accelerometer):
https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation

### Kinect:
https://github.com/wouterverweirder/kinect2
https://github.com/nguyer/node-kinect

### And more...
Different packages available at:
https://www.npmjs.com/browse/keyword/sensors

### And even MUCH more
In case there are no current package, you can always use nbind to make a C++ library accessible via JavaScript using:
https://github.com/charto/nbind

## Gathering actuators data
There are a bunch of examples available on the internet! For instance:

### Vibration API for mobiles (actuator)
https://davidwalsh.name/vibration-api

### DMX:
https://github.com/wiedi/node-dmx

### P5.js
Exploring simple examples of this tool:
https://p5js.org/

### WebPD
Exploring simple examples of this tool:
https://github.com/sebpiq/WebPd

#Everthing together!
Let the fun begin!

## P5.js + Node.js
All I need to do is to find a way to transfer the P5.js file to the client!
https://www.youtube.com/playlist?list=PLRqwX-V7Uu6b36TzJidYfIYwTFEq3K5qH

## WebPd + Node.js
All I need to do is to find a way to transfer the WebPD.js file to the client!

--
Jeronimo Barbosa
jeraman.info
