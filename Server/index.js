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
    const array = new Float32Array(4);

    for (var j = 0; j < array.length; ++j) {
      array[j] = i;
    }

    console.log("sending text data: 'Text " + i + "'");
    ws.send("Text " + i);

    console.log("sending binary data:", Array.from(array));
    ws.send(array);
  }
});

console.log("Listening on 8080");
