const msgList = document.querySelector("ul");
const msgForm = document.querySelector("form");

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

const handelSubmit = (e) => {
  e.preventDefault();
  const input = msgForm.querySelector("input");
  socket.send(input.value);
  console.log(input.value);
  input.value = "";
};

msgForm.addEventListener("submit", handelSubmit);
