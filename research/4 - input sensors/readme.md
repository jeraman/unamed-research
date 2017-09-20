# Sensor input
We are going to address here different sensor inputs.

The sensor inputs covered so far are:

## Touchscreen
Gather touch events from touchscreen-based devices (e.g. cell phones and tablets).

https://mobiforge.com/design-development/html5-mobile-web-touch-events

## Device motion
Gather device orientation events form devices, such as accelerometer, and gyroscope.

https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation

## Mouse
Handles mouse events:

https://github.com/apexearth/mouse-events/blob/master/test/index.html

## Keyboard
Deals with keyboard events:

https://www.w3schools.com/jsref/dom_obj_event.asp

## Metainfo about the device
As follows:

```
console.log("socket connection is working!")
console.log(" - socket id: ", socket.id);
console.log(" - user-agent: ", socket.request.headers['user-agent']);
console.log(" - ip address: ", socket.handshake.address);
console.log(" - hostname: ", socket.request.headers.hostname);
```

Further info can be found at the [sockets.io](sockets.io) website.

## Kinect (external sensor)
