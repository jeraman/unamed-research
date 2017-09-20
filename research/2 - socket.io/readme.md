# Socket.io communication
Ultimately, we want data to be sent to and from the client (i.e. server-client communication). This will allow us, for instance, to send data from sensors, or to display one rgb color in the display.

There are different ways to implement this communication. In my case, I've used  [Websockets](https://en.wikipedia.org/wiki/WebSocket)—a low latency communication protocol, check [here](https://www.html5rocks.com/pt/tutorials/websockets/basics/) for a tutorial—via the library [Sockets.io](https://sockets.io).

Sockets.io is a library that implements websockets to make the usage of sockets easier, faster, and (it seems so) multimedia-friendly. To see a practical example, check [this link](https://socket.io/get-started/chat/).

Sockets.io seems to be the way to go because it's [easy & straightforward to use, fast, and reliable](https://stackoverflow.com/questions/25023118/is-socket-io-a-reliable-chat-server-for-large-number-of-users-if-yes-whats-you) ;)

In this exercise, I've followed this tutorial:
https://www.youtube.com/watch?v=ggVsXljT0MI&list=PL4cUxeGkcC9i4V-_ZVwLmOusj8YAUhj_9

It is based on a library called Express:
https://expressjs.com

A video tutorial is available in:
https://www.youtube.com/watch?time_continue=52&v=HxGt_3F0ULg

During this study, I've faced lots of problems when debugging because no explicit error messages were provided when programming. It seems this tool here can help us in this:
https://www.youtube.com/watch?v=1BSrE-OUXm4
