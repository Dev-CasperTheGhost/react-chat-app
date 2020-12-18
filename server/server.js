const express = require("express");
const helmet = require("helmet");
const app = express();
const port = 3001;

const server = app.listen(port, () => console.log(`Running on ${port}`));
const io = require("socket.io")(server, { cors: { origins: ["http://localhost:3000"] } });

app.use(helmet());

io.on("connection", (socket) => {
  socket.emit("message", { username: "System", message: "Welcome to chatty" });

  const users = [];

  function getUserById(id) {
    return users.find((user) => user.id === id);
  }

  socket.on("joined", (data) => {
    const user = { username: data.username, id: socket.id };
    users.push(user);

    socket.broadcast.emit("users", { users: users });
    socket.broadcast.emit("message", {
      username: "System",
      message: `${data.username} has joined the chat!`,
    });
  });

  socket.on("disconnect", () => {
    const user = getUserById(socket.id);
    users.filter((u) => u.id !== user.id);

    io.emit("message", {
      username: "System",
      message: `${user && user.username} has left the chat`,
    });
  });

  socket.on("chatMessage", (message) => {
    const user = getUserById(socket.id);
    io.emit("message", { username: user.username, message: message });
  });
});
