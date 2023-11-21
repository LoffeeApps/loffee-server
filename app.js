
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
 });

 io.on("connection", (socket) => {
    console.log("new connection", socket.id)

    socket.emit("test1", socket)

    io.emit("test1", {message: `aku join dong, id ku ${socket.id}`})

    socket.on("disconnect", () => {
        console.log(`Halo ID ${socket.id} is disconnected`)
    })

    
 })

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(require("./routes"));



module.exports = server;