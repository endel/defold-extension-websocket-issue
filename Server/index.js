const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log("client connected!");

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  //
  // send 5 binary messages right after connection has been established
  //
  for (let i=0; i<5; i++) {
    console.log("sending text data: 'Text " + i + "'");
    ws.send("Text " + i);

    const buff = Buffer.alloc(4).fill(i);
    console.log("sending binary data:", Array.from(buff));
    ws.send(buff);
  }
});

console.log("Listening on 8080");
