const WebSocket = require('ws');

const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = function(message) {
  console.log("Received:", message.data);
}

ws.onclose = function(e) {
  console.log("Close code:", e.code);
}

ws.onerror = function(err) {
  console.log("Error:", err)
}

// setTimeout(() => ws.send("terminate"), 1000);
setTimeout(() => ws.send("close"), 1000);
