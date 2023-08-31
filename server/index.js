require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const {Plan, Distributionw} = require('./models/models')
const cors = require('cors')
const fs = require('fs');
const https = require('https')
const Route = require('./routes/route')
const errorHandler = require('./middleware/ErrorHandling')
const path = require('path')
const bodyParser = require("body-parser");
//планировщик
const cron = require('node-cron');

// Port that the webserver listens to
const port = process.env.PORT || 5000;
//const host = process.env.

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

            distributions.forEach(async (item)=> {
                const date1 = new Date(item.datestart)
                const dateNow = new Date()
                console.log("date1: ", date1)
                console.log("dateNow: ", dateNow)

                const milliseconds = Math.floor((date1 - dateNow));       
                console.log("milliseconds: ", milliseconds)

                if (milliseconds > 0) {          
                    const objPlan = {
                        users: item.users,
                        plan: newObj,
                        text: item.text,
                        textButton: item.textButton,
                        image: item.image,
                        time: milliseconds,
                        id: item.id,  
                        projId: item.projectId,      
                    }

                    console.log("objPlan: ", objPlan)
                }
            })
            
            // const plan = await Plan.findOne({
            //     where: {datestart: `${day}.${month}.${year}`}
            // })

            // const plan2 = await Plan.findOne({
            //     where: {datestart: `${day2}.${month2}.${year}`}
            // })


            //запланировать отправку рассылок
            //1-й день
            // const newObj = {
            //     "datestart": plan.dataValues.datestart,
            //     "times": plan.dataValues.times
            // }

            //const newArray = JSON.parse(plan.dataValues.times)

            //массив дат 1-го дня
            // newArray.forEach(async (item)=> {

            //     const d1 = Date.parse(`${year}-${item.date.split('.')[1]}-${item.date.split('.')[0]}T${item.time}:00`);
            //     const d2 = new Date().getTime() //- 10800000
                
            //     const date1 = new Date(d1)
            //     const dateNow = new Date(d2)
            //     console.log("date1: ", date1)
            //     console.log("dateNow: ", dateNow)
                
            //     const milliseconds = Math.floor((date1 - dateNow));       
            //     console.log("milliseconds: ", milliseconds)
            
            //     if (milliseconds > 0) {          
            //         // const objPlan = {
            //         //     users: selected,
            //         //     plan: newObj,
            //         //     text: textDistr,
            //         //     textButton: textButton,
            //         //     time: milliseconds,
            //         //     id: dataDistrib.id,  
            //         //     projId: projectId,      
            //         // }

            //         // console.log("objPlan: ", objPlan)
        
            //         //запланировать отправку рассылок
            //         //await addTimer(objPlan)
            //         // const response = await fetch('/api/plan/timer/add', {
            //         //     method: 'post',
            //         //     body: JSON.stringify(objPlan),
            //         //     headers: {'Content-Type': 'application/json'}
            //         // });
            //     }
            // })

        });

    } catch (error) {
        console.log('Подключение к БД сломалось!', error)
    }
}

start()