import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// 브라우저로의 연결 socket
wss.on("connection", (socket) => {
  socket.send("hello");
  socket.on("close", () => {
    console.log("disconneted from browser!! ❌");
  });
  socket.on("message", (msg) => {
    console.log(msg.toString("utf8"));
  });
  console.log("conneted to browser!! ✅");
});

server.listen(3000, handleListen);
