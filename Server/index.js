const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log("client connected!");

  ws.on('message', function incoming(data) {
    var message = data.toString();

    if (message === "close") {
      //
      // Close with code 1005 (CLOSED_NO_STATUS)
      // (See all WebSocket close codes here: https://github.com/Luka967/websocket-close-codes)
      //
      console.log("Close with code 1005 (CLOSED_NO_STATUS)");
      ws.close();

    } else if (message === "terminate") {
      //
      // Close with code 1006 (CLOSE_ABNORMAL)
      // (See all WebSocket close codes here: https://github.com/Luka967/websocket-close-codes)
      //
      console.log("Close with code 1006 (CLOSE_ABNORMAL)");
      ws.terminate()
    }
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
