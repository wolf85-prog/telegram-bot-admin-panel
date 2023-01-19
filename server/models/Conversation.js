const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Conversation = sequelize.define('conversation', {
    members: {type: DataTypes.ARRAY},
})


module.exports = {Conversation}