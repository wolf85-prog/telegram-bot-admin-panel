const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const UserBot = sequelize.define('userbot', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING, unique: true},
    avatar: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    block: {type: DataTypes.BOOLEAN},
})

const Manager = sequelize.define('manager', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fio: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING}, 
    city: {type: DataTypes.STRING},
    company: {type: DataTypes.STRING},
    projects: {type: DataTypes.STRING},
    dojnost: {type: DataTypes.STRING},
    comteg: {type: DataTypes.STRING},
    worklist: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING, unique: true},
    from: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING},
    comment: {type: DataTypes.TEXT}, 
    block: {type: DataTypes.BOOLEAN},
    deleted: {type: DataTypes.BOOLEAN},
    great: {type: DataTypes.BOOLEAN},
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    conversationId: {type: DataTypes.STRING},
    senderId: {type: DataTypes.STRING},
    receiverId: {type: DataTypes.STRING},    
    text: {type: DataTypes.STRING}, //текст сообщения;
    type: {type: DataTypes.STRING},      //тип сообщения;
    isBot: {type: DataTypes.BOOLEAN},
    messageId: {type: DataTypes.STRING},
    buttons: {type: DataTypes.STRING},   //названия кнопок;
    replyId: {type: DataTypes.STRING}, //id пересылаемого сообщения
})

const Conversation = sequelize.define('conversation', {
    members: {type: DataTypes.ARRAY(DataTypes.STRING)},
})


module.exports = {
    UserBot, 
    Message, 
    Conversation, 
    Manager,
}