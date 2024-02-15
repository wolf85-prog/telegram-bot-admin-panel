require("dotenv").config();

//подключение к БД PostreSQL
const sequelize = require('./../../botworker/connections/db')
const {Message, Conversation} = require('./../../botworker/models/models')
const chatTelegramId = process.env.CHAT_ID
const { Op } = require('sequelize')

module.exports = async function sendMyMessage(text, typeText, chatId, messageId, replyId) {
    //создать беседу в админке в бд 
    //сохранить отправленное боту сообщение пользователя в БД
    let  conversation_id              
    try {                  
        //найти беседу
        const conversation = await Conversation.findOne({
            where: {
                members: {
                    [Op.contains]: [chatId]
                }
            },
        })   
        
        //console.log("conversation: ", conversation)

        //если нет беседы, то создать 
        if (!conversation) {
            const conv = await Conversation.create(
            {
                members: [chatId, chatTelegramId],
            })
            console.log("Беседа успешно создана: ", conv) 
            console.log("conversationId: ", conv.id)
            
            conversation_id = conv.id
        } else {
            console.log('Беседа уже создана в БД')  
            console.log("conversationId: ", conversation.id)  
            
            conversation_id = conversation.id
        }

        const messageDB = await Message.create(
        {
            text: text, 
            senderId: chatId, 
            receiverId: chatTelegramId,
            type: typeText,
            conversationId: conversation_id,
            messageId: messageId,
            replyId: replyId,
        })

        return conversation_id;
    } catch (error) {
        console.log(error)
    }
}          