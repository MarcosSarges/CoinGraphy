const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 1244 });

let a = 0;

wss.on("connection", (ws) => {
  setInterval(() => {
    a++;
    ws.send("Welcome to the WebSocket server!   " + a);
  }, 1000/120);

  ws.on("message", (message) => {
    console.log("Received:", message);
    ws.send("Server received: " + message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on port 1244");
