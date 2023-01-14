// 서버로의 연결 socket
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("conneted to server!! ✅");
});

socket.addEventListener("message", (msg) => {
  console.log("new message", msg.data, "from server");
});

socket.addEventListener("close", () => {
  console.log("disconneted from server!! ❌");
});

setTimeout(() => {
  socket.send("hello from the browser");
}, 5000);
