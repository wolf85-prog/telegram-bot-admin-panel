const fs = require('fs');
const https = require('https');

// Создание сервера
const express = require("express");
const socket = require("socket.io");
const cors = require('cors');

const PORT = 9000;
const app = express();
// app.use(cors({
//     origin:"https://proj.uley.team:3000",
//     origin:"https://proj.uley.team:8000",
// }));

// Certificate
const privateKey = fs.readFileSync('privkey.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/cert.pem', 'utf8');
const ca = fs.readFileSync('chain.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const httpsServer = https.createServer(credentials, app);

// const server = app.listen(PORT, function () {
//     console.log(`Listening on port ${PORT}`);
//     console.log(`http://proj.uley.team:${PORT}`);
//   });

httpsServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://proj.uley.team:${PORT}`);
});

// Socket setup
const io = socket(httpsServer, {
    cors:{
        origin:"https://proj.uley.team:3000"
    }
});


// const io = require("socket.io")(9000, {
//     cors:{
//         origin:"http://localhost:3000"
//     },
// });

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user=>user.userId ===userId) &&
        users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId)=>{
    return users.find((user) => user.userId === userId);
};



io.on("connection", (socket) => {
    //when connect
    console.log("a user connected")
    // Отправляем всем кто подключился сообщение привет
    io.emit("welcome", "hello this is socket server!")

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text})=>{
        const user = getUser(receiverId)
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        })
    })

    //when disconnect
    socket.on("disconnect", ()=> {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users)
    })
})
