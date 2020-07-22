const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const port = 3001;

const server = app.listen(port, () => console.log(`Running on ${port}`));
const io = require('socket.io')(server);

app.use(cors({ origin: 'http://chatty.caspertheghost.me' }));
app.use(helmet());

io.on("connection", socket => {
    socket.emit("message", { username: "System", message: "Welcome to chatty" });


    const users = [];

    function getUserById(id) {
        return users.find(user => user.id === id);
    }


    socket.on("joined", (data) => {
        const user = { username: data.username, id: socket.id };
        users.push(user);

        socket.broadcast.emit("users", { users: users })
        socket.broadcast.emit("message", { username: "System", message: `${data.username} has joined the chat!` });
    });

    socket.on("startedTyping", () => {
        socket.broadcast.emit("isTyping", true)
    })

    socket.on("stoppedTyping", () => {
        socket.broadcast.emit("isTyping", false)
    })


    socket.on("disconnect", () => {
        const userIndex = users.findIndex(user => user.id === socket.id);
        users.splice(userIndex, 1)[0]

        io.emit("message", { username: "System", message: "A user left the chat" })
    });

    socket.on('chatMessage', (message) => {
        const user = getUserById(socket.id);
        io.emit("message", { username: user.username, message: message });
    });
});