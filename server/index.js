require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const {Plan, Distributionw, Pretendent} = require('./models/models')
const cors = require('cors')
const fs = require('fs');
const https = require('https')
const Route = require('./routes/route')
const errorHandler = require('./middleware/ErrorHandling')
const path = require('path')
const bodyParser = require("body-parser");
//планировщик
const cron = require('node-cron');

let tasks = []

// Port that the webserver listens to
const port = process.env.PORT || 5000;
const host_api_bottest = process.env.BOTTEST_API_URL
const token = process.env.TELEGRAM_API_TOKEN_WORK

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

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        
        httpsServer.listen(port, async() => {
            console.log('HTTPS Server Admin-panel running on port ' + port);

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
            // console.log("Запускаю очистку задач...")
            // const temp = tasks.filter((item) => item.projectId === projId)
            // console.log("temp: ", temp)
            // temp.forEach((tmp)=> {
            //     //clearTimeout(tmp.task)
            //     console.log("Задача удалена! ", tmp.task)   
            // })

            console.log("Запускаю планировщик задач...")

            //получить запланированные рассылки
            const distributions = await Distributionw.findAll({
                order: [
                    ['id', 'ASC'],
                ],
                where: {
                    delivered: false
                }
            })

            distributions.forEach(async (item, index)=> {
                const date1 = item.datestart
                const dateNow = new Date().getTime() + 10800000
                console.log("date1: ", new Date(date1))
                console.log("dateNow: ", new Date(dateNow))

                const milliseconds = Math.floor(new Date(date1) - new Date(dateNow));       
                console.log("milliseconds: ", milliseconds)

                // if (milliseconds > 0) {          
                //     const objPlan = {
                //         users: item.users,
                //         //plan: newObj,
                //         text: item.text,
                //         textButton: item.textButton,
                //         image: item.image,
                //         time: milliseconds,
                //         id: item.id,  
                //         projId: item.projectId,      
                //     }

                //     console.log("objPlan: ", objPlan)

                //     console.log("!!!!Планирую запуск отправки собщения..." + (index+1))
                //     const timerId = setTimeout(() => {
                //         item.users.map(async (user, index) => {
                //             console.log("Пользователю ID: " + user + " сообщение " + text + " отправлено! Кнопка " + textButton + " отправлена!")
                            
                //             //обновить план в БД
                //             const foundItem = await Plan.findOne({ where: {datestart: item.date} });

                //             // if (!foundItem) {
                //             //     // Item not found, create a new one
                //             //     const newPlan = await Plan.create(item.date, plan.times)
                //             //     return res.status(200).json(newPlan);
                //             // }

                //             // Found an item, update it
                //             //const item = await Plan.update({times: plan.times},{where: {datestart: item.date}});


                //             //получить id специалиста по его telegramId
                //             //const worker = await getWorkerId(user)
                //             const worker = await fetch(host_api_bottest + '/workers/chat/' + user);
                            
                //             //новый претендент
                //             const pretendent = await Pretendent.create(projId, worker.data, user) //{projectId, workerId, receiverId})
                    
                //             //Передаем данные боту
                //             const keyboard = JSON.stringify({
                //                 inline_keyboard: [
                //                     [
                //                         {"text": textButton, callback_data:'/report'},
                //                     ],
                //                 ]
                //             });
                        
                //             const keyboard2 = JSON.stringify({
                //                 inline_keyboard: [
                //                     [
                //                         {"text": 'Принять', callback_data:'/accept ' + pretendent.id}, //  + pretendent.id
                //                         {"text": 'Отклонить', callback_data:'/cancel'},
                //                     ],
                //                 ]
                //             });

                //             //отправить в телеграмм
                //             let sendToTelegram
                //             if (text !== '') {
                //                 const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user}&parse_mode=html&text=${item.text.replace(/\n/g, '%0A')}`
                //                 //console.log("url_send_msg: ", url_send_msg)
                                
                //                 //sendToTelegram = await $host.get(url_send_msg);
                //                 sendToTelegram = await fetch(url_send_msg);

                //                 //const objDelivered = {
                //                 const delivered = true
                //                 //}

                //                 //обновить рассылке статус отправки
                //                 //await editDistributionW(objDelivered, dataDistrib.id)
                //                 let exist = await Distributionw.findOne( {where: {id: item.id}} )
                    
                //                 if(!exist){
                //                     res.status(500).json({msg: "Рассылка не существует!"});
                //                     return;
                //                 }
                    
                //                 const newDistrib = await Distributionw.update(
                //                     { delivered },
                //                     { where: {id: item.id} })

                //                 return res.status(200).json(newDistrib);
                //             }
                //         })
                //     }, milliseconds)
                // } 
            })

        });

    } catch (error) {
        console.log('Подключение к БД сломалось!', error)
    }
}

start()