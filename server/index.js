require('dotenv').config()
const express = require('express')
const sequelize = require('./db')

// Port that the webserver listens to
const port = process.env.PORT || 5000;

const app = express();


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