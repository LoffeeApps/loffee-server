
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

let acktiveUsers = []
io.on('connection', socket => {
    socket.on('addUser', (newUserId) => {
        if (!acktiveUsers.some((user) => user.userId === newUserId)) {
            acktiveUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }

        io.emit('get-users', acktiveUsers)
    })

    socket.on('disconnected', () => {
        acktiveUsers = acktiveUsers.filter((user) => user.socketId !== socket.id)
        console.log('Disconnected', acktiveUsers)
        io.emit('get-users', acktiveUsers)
    })
})

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(require("./routes"));



module.exports = server;