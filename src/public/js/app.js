// const msgList = document.querySelector("ul");
// const nickForm = document.querySelector("#nickname");
// const msgForm = document.querySelector("#msg");

// // 서버로의 연결 socket
// const socket = new WebSocket(`ws://${window.location.host}`);

// const makeMsg = (type, payload) => {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// };

// socket.addEventListener("open", () => {
//   console.log("conneted to server!! ✅");
// });

// socket.addEventListener("message", (msg) => {
//   const li = document.createElement("li");
//   li.innerText = msg.data;
//   msgList.appendChild(li);
// });

// socket.addEventListener("close", () => {
//   console.log("disconneted from server!! ❌");
// });

// const handelSubmit = (e) => {
//   e.preventDefault();
//   const input = msgForm.querySelector("input");
//   socket.send(makeMsg("new_message", input.value));
//   const li = document.createElement("li");
//   li.innerText = `You: ${input.value}`;
//   msgList.appendChild(li);

//   input.value = "";
// };

// const handelNickSubmit = (e) => {
//   e.preventDefault();
//   const input = nickForm.querySelector("input");
//   socket.send(makeMsg("nickname", input.value));
//   input.value = "";
// };
// msgForm.addEventListener("submit", handelSubmit);
// nickForm.addEventListener("submit", handelNickSubmit);

//==========================socket.io===============================//

const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.querySelector("#room");

room.hidden = true;

let roomName;

const addMessage = (msg) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
};

const handleMessageSubmit = (e) => {
  e.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
};

const handleNicknameSubmit = (e) => {
  e.preventDefault();
  const input = room.querySelector("#name input");
  socket.emit("nickname", input.value);
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName}`;
  const msgForm = room.querySelector("#msg");
  const nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
});

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName} (${newCount})`;

  addMessage(`${user} arrived`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName} (${newCount})`;

  addMessage(`${left} left ㅜㅜ`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});
