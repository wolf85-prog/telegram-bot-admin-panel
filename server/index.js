require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const {Plan} = require('./models/models')
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
            const plan = await Plan.findOne({
                where: {datestart: `${day}.${month}.${year}`}
            })
            console.log("plan: ", plan.dataValues.times)

            const plan2 = await Plan.findOne({
                where: {datestart: `${day2}.${month2}.${year}`}
            })
            console.log("plan2: ", plan2.dataValues.times)
        });

    } catch (error) {
        console.log('Подключение к БД сломалось!', error)
    }
}

start()