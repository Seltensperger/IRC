const express = require("express");
const app = express();
const http = require("http");
const cors = require('cors');
const { Server } = require("socket.io");


app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methode: ["GET", "POST"],
    },
});

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017'
const dbName = 'ircMongo';

MongoClient.connect(url, function (err, client) {
    console.log("Connecté à MongoDB");
    const db = client.db(dbName);
    client.close();
});

io.on("connection", (socket) => {
    console.log(`Utilisateur connecté : ${socket.id}`);



    
    // rejoindre une room
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`L'utilisateur ${socket.id} vient de rejoindre la room ${data}`)
    })


    // envoyer un message
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });


    // se deconnecter
    socket.on("disconnect", () => {
        console.log(`L'utilisateur ${socket.id} vient de se deco`, socket.id);
    });

});

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});
