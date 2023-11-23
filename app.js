
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()  
}

const express = require('express');
const app = express();
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on('connection', (socket) => {
    console.log('New Connection with ID: ', socket.id)

    socket.on("sendMessage", (payload) => {
        console.log(payload)

        socket.broadcast.emit("new-message", payload)
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})


app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(require("./routes"));



module.exports = server;