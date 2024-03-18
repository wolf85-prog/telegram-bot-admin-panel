const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const UserBot = sequelize.define('wuserbot', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING, unique: true},
    avatar: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    block: {type: DataTypes.BOOLEAN},
})

const Worker = sequelize.define('worker', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userfamily: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    dateborn: {type: DataTypes.STRING},  
    city: {type: DataTypes.STRING},
    companys: {type: DataTypes.STRING},
    stag: {type: DataTypes.STRING},
    worklist: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING, unique: true},
    promoId: {type: DataTypes.STRING},
    from: {type: DataTypes.STRING},
    comment: {type: DataTypes.TEXT}, 
    rank: {type: DataTypes.INTEGER}, 
    block: {type: DataTypes.BOOLEAN}, 
})

const Message = sequelize.define('wmessage', {
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

const Conversation = sequelize.define('wconversation', {
    members: {type: DataTypes.ARRAY(DataTypes.STRING)},
})


module.exports = {
    UserBot, 
    Message, 
    Conversation, 
    Worker,
}