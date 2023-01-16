require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandling')
const path = require('path')

//import { Server } from 'socket.io'
//import onConnection from './socket_io/onConnection.js'
//import { getFilePath } from './utils/file.js'
//import onError from './utils/onError.js'
//const upload = require('./utils/upload.js')

// Port that the webserver listens to
const port = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        
        app.listen(port, () => {
            console.log('HTTPS Server Admin-panel running on port ' + port);
        });

    } catch (error) {
        console.log('Подключение к БД сломалось!', error)
    }
}

start()