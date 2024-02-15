require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const {Plan, Distributionw, } = require('./models/models')
const {Message, Conversation} = require('./models/workers')
const { Op } = require('sequelize')
const cors = require('cors')
const fs = require('fs');
const https = require('https')
const Route = require('./routes/route')
const errorHandler = require('./middleware/ErrorHandling')
const path = require('path')
const bodyParser = require("body-parser");

//планировщик
const cron = require('node-cron');

//fetch api
const fetch = require('node-fetch');

//socket.io
const {io} = require("socket.io-client")
const socketUrl = process.env.SOCKET_APP_URL

let tasks = []

// Port that the webserver listens to
const port = process.env.PORT || 5000;
const token = process.env.TELEGRAM_API_TOKEN_WORK
const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
const host = process.env.HOST

const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, 'images')))
app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', Route);

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

// Обработка ошибок, последний middleware
app.use(errorHandler)

const getDistributionsPlan = async() => {
    console.log("Обновляю план рассылок...")

    const d = new Date();
    const month = String(d.getMonth()+1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const date_str = `${day}.${month}`;
    
    d.setDate(d.getDate() + 1);
    const month2 = String(d.getMonth()+1).padStart(2, "0");
    const day2 = String(d.getDate()).padStart(2, "0");
    const date_str2 = `${day2}.${month2}`;
    const year = d.getFullYear();

    //удаление таймеров
    console.log("Запускаю очистку задач...")
    //console.log("tasks: ", tasks)
    tasks.forEach((tmp)=> {
        clearTimeout(tmp)
        //console.log("Задача удалена! ")   
    })

    //console.log("Запускаю планировщик задач...")

    //получить запланированные рассылки
    const distributions = await Distributionw.findAll({
        order: [
            ['id', 'ASC'],
        ],
        where: {
            delivered: false
        }
    })

    //console.log("Рассылки:", distributions)

    //рассылки
    distributions.forEach(async (item, index)=> {
        let countSuccess = 0
        const date1 = item.datestart //дата отправки рассылки
        const dateNow = new Date().getTime() + 10800000 //текущая дата
        console.log("date1: ", new Date(date1))
        console.log("dateNow: ", new Date(dateNow))

        const d = new Date(date1);
        const month = String(d.getMonth()+1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const year = d.getFullYear();
        const chas = d.getHours();
        const minut = String(d.getMinutes()).padStart(2, "0");
        const date2 = `${day}.${month}.${year}`

        const milliseconds = Math.floor(new Date(date1) - new Date(dateNow));       
        console.log("milliseconds: ", milliseconds)

        if (milliseconds > 0) {          
            const objPlan = {
                users: item.users.split(','),
                text: item.text,
                textButton: item.textButton,
                image: item.image,
                time: milliseconds,
                id: item.id,  
                projId: item.projectId, 
                uuid: item.uuid     
            }

            console.log("!!!!Планирую запуск отправки собщения..." + (index+1))
            const timerId = setTimeout(() => {
                objPlan.users.map(async (user, ind) => {
                    console.log("Пользователю ID: " + user + " сообщение " + item.text + " отправлено!")

                    //let conversationId = await getConversation(user)
                    let  conversation_id  
                    let sendToTelegram
                    let sendPhotoToTelegram

                    //найти беседу
                    const conversation = await Conversation.findOne({
                        where: {
                            members: {
                                [Op.contains]: [user]
                            }
                        },
                    }) 

                     //если нет беседы, то создать 
                    if (!conversation) {
                        const conv = await Conversation.create(
                        {
                            members: [user, chatAdminId],
                        })
                        console.log("Беседа успешно создана: ", conv) 
                        console.log("conversationId: ", conv.id)
                        
                        conversation_id = conv.id
                    } else {
                        console.log('Беседа уже создана в БД')  
                        console.log("conversationId: ", conversation.id)  
                        
                        conversation_id = conversation.id
                    }

                    //получить план из БД
                    const plan = await Plan.findOne({
                        where: {datestart: date2}
                    })
                    
                    const newArray = JSON.parse(plan.dataValues.times)
                    let time1 = `${chas}:${minut}`

                    //обновить план в БД
                    let planer_str
                    let dateIndex = newArray.findIndex((i) => i.time === time1)
                    const datesCopy = JSON.parse(JSON.stringify(newArray));
                    const dateObject = datesCopy[dateIndex];
                    datesCopy[dateIndex] = { ...dateObject, ['go']: true};
                    planer_str = JSON.stringify(datesCopy)

                    const newObj = {
                        "datestart": date2,
                        "times": planer_str
                    }

                    //обновить план в БД
                    const foundItem = await Plan.findOne({ where: {datestart: newObj.datestart} });
                    if (!foundItem) {
                        // Item not found, create a new one
                        const newPlan = await Plan.create(newObj.datestart, newObj.times)
                        //return res.status(200).json(newPlan);
                    } else {
                       // Found an item, update it
                        const item = await Plan.update({times: newObj.times},{where: {datestart: newObj.datestart}});
                    }

                    const projId = item.projectId            
                    
                    //Передаем данные боту
                    const keyboard = JSON.stringify({
                        inline_keyboard: [
                            [
                                {"text": item.textButton, callback_data:'/report'},
                            ],
                        ]
                    });
                
                    const keyboard2 = JSON.stringify({
                        inline_keyboard: [
                            [
                                {"text": 'Принять', callback_data:'/accept ' + projId}, //  + pretendent.id
                                {"text": 'Отклонить', callback_data:'/cancel ' + projId},
                            ],
                        ]
                    });

                    try {
                        //отправить в телеграмм
                        if (item.text !== '') {
                            const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user}&parse_mode=html&text=${item.text.replace(/\n/g, '%0A')}`
                            
                            sendToTelegram = await fetch(url_send_msg);

                            const { status } = sendToTelegram;

                            if (status === 200 && item.text === '') {
                                countSuccess = countSuccess + 1            
                            }
                        }

                        const url_send_photo = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${user}&photo=${item.image}&reply_markup=${item.textButton ? keyboard : keyboard2}`
                        //console.log("url_send_photo2: ", url_send_photo)

                        sendPhotoToTelegram = await fetch(url_send_photo);
                        //console.log("sendPhotoToTelegram: ", sendPhotoToTelegram)

                        const { status } = sendPhotoToTelegram;

                        if (status === 200 && item.text === '') {
                            countSuccess = countSuccess + 1            
                        }
                    
                    } catch (error) {
                        console.error(error.message)
                    }

                    //обновить статус рассылки delivered - true
                    const delivered = true

                    let exist = await Distributionw.findOne( {where: {id: item.id}} )           
                    if(!exist){
                        console.log("Рассылка не существует!");
                    }
            
                    const newDistrib = await Distributionw.update(
                        { delivered,
                          success: countSuccess},
                        { where: {id: item.id} }
                    )

                    //отправить в админку
                    let message = {};
                    
                    if(!item.image) {
                        console.log("no file")
                        message = {
                            senderId: chatAdminId, 
                            receiverId: user,
                            conversationId: conversation_id,
                            type: "text",
                            text: text,
                            is_bot: true,
                            messageId: '',
                            buttons: '',
                        }
                    } else {
                        message = {
                            senderId: chatAdminId, 
                            receiverId: user,
                            conversationId: conversation_id,
                            type: "image",
                            text: item.image,
                            is_bot: true,
                            messageId: '',
                            buttons: item.textButton ? item.textButton : '',
                        }
                    }
                    console.log("message send: ", message);

                    //сохранение сообщения в базе данных wmessage
                    await Message.create(message)

                    //сохранить в контексте
                    if(!item.image) {
                        addNewMessage2(user, text, 'text', '', conversation_id, '');
                    } else {
                        addNewMessage2(user, host + item.image, 'image', item.textButton, conversation_id, '');
                    }
                })
            }, milliseconds)

            tasks.push(timerId)
        } 
    })
}

//отправить сообщение из админки workhub
const addNewMessage2 = (userId, message, type, textButton, convId, messageId) => {

    // Подключаемся к серверу socket
    let socket = io(socketUrl);
    socket.emit("addUser", userId)
      
    //отправить сообщение в админку
	socket.emit("sendAdminSpec", { 
		senderId: chatAdminId,
		receiverId: userId,
		text: message,
		type: type,
		buttons: textButton,
		convId: convId,
		messageId,
	})
};

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        
        httpsServer.listen(port, async() => {
            console.log('HTTPS Server Admin-panel running on port ' + port);

            // начало цикла           
            setInterval(async() => {              
                getDistributionsPlan()
            }, 120000) //каждые 2 минуты);                 
        }); 

    } catch (error) {
        console.log('Подключение к БД сломалось!', error)
    }
}

start()