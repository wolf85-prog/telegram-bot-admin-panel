require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandling')

//import { Server } from 'socket.io'
//import onConnection from './socket_io/onConnection.js'
//import { getFilePath } from './utils/file.js'
//import onError from './utils/onError.js'
//const upload = require('./utils/upload.js')

// Port that the webserver listens to
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json())
app.use('/api', router)

// Обрабатываем загрузку файлов
// app.use('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) return res.sendStatus(400)
  
//     // формируем относительный путь к файлу
//     const relativeFilePath = req.file.path
//       .replace(/\\/g, '/')
//       .split('server/files')[1]
  
//     // и возвращаем его
//     res.status(201).json(relativeFilePath)
// })

// Обрабатываем получение файлов
// app.use('/files', (req, res) => {
//     // формируем абсолютный путь к файлу
//     const filePath = getFilePath(req.url)
  
//     // и возвращаем файл по этому пути
//     res.status(200).sendFile(filePath)
// })

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