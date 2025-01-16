require('dotenv').config()
const fs = require('fs');
const https = require('https');

// Создание сервера
const express = require("express");
const socket = require("socket.io");
const cors = require('cors');

const PORT = process.env.PORT
const host_admin = process.env.HOST_ADMIN
const host_admin2 = process.env.HOST_ADMIN2
const host_admin3 = process.env.HOST_ADMIN3
const host_admin4 = process.env.HOST_ADMIN4
const host_local = process.env.HOST_LOCAL
const host = process.env.HOST

const app = express();
app.use(cors())

// Enable CORS for all routes  localho.st
// app.use(cors({ 
//     origin: 'http://localhost:3000', 
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
    console.log(`${host}:${PORT}`);
});

// Socket setup
const io = socket(httpsServer, {
    cors: {
        origin: [host_admin, host_admin2, host_admin3, host_admin4, host_local],
        optionsSuccessStatus: 200 // For legacy browser support
    }
});


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
    socket.on("sendMessageSpec", ({senderId, receiverId, text, type, convId, messageId, replyId, isBot})=>{
        const user = getUser(receiverId)
        io.emit("getMessageSpec", {
            senderId,
            text,
            type,
            convId,
            messageId,
            replyId,
            isBot, 
        })
    })

    //send and get message
    socket.on("sendAdminSpec", ({senderId, receiverId, text, type, buttons, convId, messageId, isBot})=>{
        io.emit("getAdminSpec", {
            senderId,
            receiverId,
            text,
            type,
            buttons,
            convId,
            messageId,
            isBot,
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


// Чат renthub
//------------------------------------------------------------------
    //send and get message in workers
    socket.on("sendMessageRent", ({senderId, receiverId, text, type, convId, messageId, replyId, isBot})=>{
        const user = getUser(receiverId)
        io.emit("getMessageRent", {
            senderId,
            text,
            type,
            convId,
            messageId,
            replyId,
            isBot, 
        })
    })


    //send and get message
    socket.on("sendAdminRent", ({senderId, receiverId, text, type, buttons, convId, messageId, isBot})=>{
        io.emit("getAdminRent", {
            senderId,
            receiverId,
            text,
            type,
            buttons,
            convId,
            messageId,
            isBot,
        })
    })

    //send and get message
    socket.on("delAdminRent", ({messageId, messageDate, chatId})=>{
        io.emit("getDelAdminRent", {
            messageId,
            messageDate,
            chatId,
        })
    })


// Чат тех. поддержки
//------------------------------------------------------------------
    //send and get message in workers
    socket.on("sendMessageSupport", ({senderId, receiverId, text, type, convId, messageId, replyId, isBot})=>{
        const user = getUser(receiverId)
        io.emit("getMessageSupport", {
            senderId,
            text,
            type,
            convId,
            messageId,
            replyId,
            isBot, 
        })
    })

    //send and get message
    socket.on("sendAdminSupport", ({senderId, receiverId, text, type, buttons, convId, messageId, isBot})=>{
        io.emit("getAdminSupport", {
            senderId,
            receiverId,
            text,
            type,
            buttons,
            convId,
            messageId,
            isBot,
        })
    })

    //send and get message
    socket.on("delAdminSupport", ({messageId, messageDate, chatId})=>{
        io.emit("getDelAdminSupport", {
            messageId,
            messageDate,
            chatId,
        })
    })




    // Notifications
    //------------------------------------------------------------------
    //send and get message in workers
    socket.on("sendNotif", ({task, tg_id, fio, sity, year_of_birth, rating, projects, specialities, 
        comtags, foto, phone, workers_update, processUpdateD, processDistrib})=>{
        io.emit("getNotif", {
            task,
            tg_id,
            fio,
            sity,
            year_of_birth, 
            rating, 
            projects, 
            specialities, 
            comtags, 
            foto,
            phone,
            workers_update,
            processUpdateD,
            processDistrib,
        })
    })  

    socket.on("sendNotifRent", ({task, managers_update, processUpdateD, processDistrib})=>{
        io.emit("getNotifRent", {
            task,
            managers_update,
            processUpdateD,
            processDistrib,
        })
    }) 
    
    // Distribution
    //------------------------------------------------------------------
    //send and get distrib
    socket.on("sendDistrib", ({task})=>{
        io.emit("getDistrib", {
            task
        })
    })

    //send and get message in workers
    socket.on("sendWorker", ({task, data})=>{
        io.emit("getWorker", {
            task,
            data,
        })
    })  


    //send and get message in workers
    socket.on("sendSpecialist", ({id, fio, profile})=>{
        io.emit("getSpecialist", {
            id,
            fio,
            profile,
        })
    })  


    // Process
    //------------------------------------------------------------------
    //send and get process
    socket.on("sendProcess", ({process, data, interval, time})=>{
        io.emit("getProcess", {
            process,
            data,
            interval,
            time,
        })
    })


    // Renthub мониторинг
    //send and get message in workers
    socket.on("sendZakazchik", ({task, data})=>{
        io.emit("getZakazchik", {
            task,
            data,
        })
    }) 


    //when disconnect
    socket.on("disconnect", ()=> {
        removeUser(socket.id);
        io.emit("getUsers", users)
    })

})
