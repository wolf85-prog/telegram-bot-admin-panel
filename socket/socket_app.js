const fs = require('fs');
const https = require('https');

// Создание сервера
const express = require("express");
const socket = require("socket.io");
const cors = require('cors');

const PORT = 9000;
const app = express();
app.use(cors())
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

httpsServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`https://proj.uley.team:${PORT}`);
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
    console.log("getUser: ", users)
    return users.find((user) => user.userId === userId);
};



io.on("connection", (socket) => {

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text, type, convId, messageId, replyId})=>{
        const user = getUser(receiverId)
        io.emit("getMessage", {
            senderId,
            text,
            type,
            convId,
            messageId,
            replyId,
        })
    })

    //send and get message
    socket.on("sendAdmin", ({senderId, receiverId, text, type, buttons, convId, messageId})=>{
        io.emit("getAdmin", {
            senderId,
            receiverId,
            text,
            type,
            buttons,
            convId,
            messageId,
        })
    })

    //send and get message
    socket.on("delAdmin", ({messageId, messageDate, chatId})=>{
        io.emit("getDelAdmin", {
            messageId,
            messageDate,
            chatId,
        })
    })

// Чат специалистов
//------------------------------------------------------------------
    //send and get message in workers
    socket.on("sendMessageSpec", ({senderId, receiverId, text, type, convId, messageId})=>{
        const user = getUser(receiverId)
        io.emit("getMessageSpec", {
            senderId,
            text,
            type,
            convId,
            messageId,
        })
    })

    //send and get message
    socket.on("sendAdminSpec", ({senderId, receiverId, text, type, buttons, convId, messageId})=>{
        io.emit("getAdminSpec", {
            senderId,
            receiverId,
            text,
            type,
            buttons,
            convId,
            messageId,
        })
    })

    //send and get message
    socket.on("delAdminSpec", ({messageId, messageDate, chatId})=>{
        io.emit("getDelAdminSpec", {
            messageId,
            messageDate,
            chatId,
        })
    })

    // Notifications
    //------------------------------------------------------------------
    //send and get message in workers
    socket.on("sendNotif", ({task})=>{
        io.emit("getNotif", {
            task
        })
    })      


    //when disconnect
    socket.on("disconnect", ()=> {
        removeUser(socket.id);
        io.emit("getUsers", users)
    })

})
