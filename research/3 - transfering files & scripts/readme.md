## Transfering files to the client: is it possible? (3 - transfering files & scripts)
Yes. You can do this by using [static files support in Express](http://expressjs.com/en/starter/static-files.html) as follows:
```
app.use(express.static('public'))
```
Using this command, all files placed inside public are going to be available to clients.

It seems there are others ways to do the same. In theory, I could also try to [send custom-format files using sendFile](https://expressjs.com/en/api.html#res.sendFile). Alternatively, I could read and write files natively in Node.js as [shown here](https://www.youtube.com/watch?v=U57kU311-nE&index=9&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp). However, didn't even bother to try these options because the first one worked!
