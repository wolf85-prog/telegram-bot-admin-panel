const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Conversation = sequelize.define('conversation', {
    members: {type: DataTypes.ARRAY(DataTypes.STRING)},
})


module.exports = Conversation