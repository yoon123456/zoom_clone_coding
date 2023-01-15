const msgList = document.querySelector("ul");
const nickForm = document.querySelector("#nickname");
const msgForm = document.querySelector("#msg");

// 서버로의 연결 socket
const socket = new WebSocket(`ws://${window.location.host}`);

const makeMsg = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

socket.addEventListener("open", () => {
  console.log("conneted to server!! ✅");
});

socket.addEventListener("message", (msg) => {
  const li = document.createElement("li");
  li.innerText = msg.data;
  msgList.appendChild(li);
});

socket.addEventListener("close", () => {
  console.log("disconneted from server!! ❌");
});

const handelSubmit = (e) => {
  e.preventDefault();
  const input = msgForm.querySelector("input");
  socket.send(makeMsg("new_message", input.value));
  const li = document.createElement("li");
  li.innerText = `You: ${input.value}`;
  msgList.appendChild(li);

  input.value = "";
};

const handelNickSubmit = (e) => {
  e.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMsg("nickname", input.value));
  input.value = "";
};
msgForm.addEventListener("submit", handelSubmit);
nickForm.addEventListener("submit", handelNickSubmit);
