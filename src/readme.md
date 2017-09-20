# Dependencies
So far, I'm using for the server side:
- [Node.js](nodejs.org);
- [Express](expressjs.com);
- [Socket.io](socket.io);

And for the client side:
- [Socket.io](socket.io);
- [Modernizr](https://modernizr.com/);
- [Detectizr](https://baris.aydinoglu.info/Detectizr/);

# Remote debugging
It's possible to remote debug websites in mobile devices, as follows:
- [For Android & Chrome;](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)
- [For Safari & iOS.](http://developer.telerik.com/featured/a-concise-guide-to-remote-debugging-on-ios-android-and-windows-phone/#ios)

# Java-Javascript bridge
A few available options are:
- [J2V8](https://eclipsesource.com/blogs/2016/07/20/running-node-js-on-the-jvm/) (repository [here](https://github.com/eclipsesource/j2v8) );
- [Trireme](https://github.com/apigee/trireme);
- Sockets & UDP (i.e. re-route data to java);
- [Nodyn](https://github.com/nodyn/nodyn), although the tool is no longer actively developed;
- [RingoJS](https://ringojs.org/);
- Eric Hartford's comment on the end of [this blog post](https://www.namekdev.net/2016/04/the-state-of-importing-node-js-modules-into-java/);
