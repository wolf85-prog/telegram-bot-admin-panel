require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fs = require('fs');
const https = require('https')
const fileUpload = require('express-fileupload')
const Route = require('./routes/route')
const errorHandler = require('./middleware/ErrorHandling')
const path = require('path')
const bodyParser = require("body-parser");

// Port that the webserver listens to
const port = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use("/api'", Route);

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
        
        httpsServer.listen(port, () => {
            console.log('HTTPS Server Admin-panel running on port ' + port);
        });

    } catch (error) {
        console.log('Подключение к БД сломалось!', error)
    }
}

start()