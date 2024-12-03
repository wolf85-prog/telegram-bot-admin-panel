const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME_R,
    process.env.DB_USER_R,
    process.env.DB_PASSWORD_R,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST_R,
        port: process.env.DB_PORT_R,
        // disable logging; default: console.log
        logging: false
    }
)