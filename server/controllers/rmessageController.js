const {Message} = require('../models/renthub')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class RmessageController {

    //add message
    async newMessageR(req, res) {
        const {conversationId, text, senderId, receiverId, type, isBot, messageId, buttons} = req.body
        try {
            await Message.create({conversationId, text, senderId, receiverId, type, isBot, messageId, buttons})
            return res.status(200).json("MessageW has been sent successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get message conversation
    async getMessagesR(req, res) {
        const conversationId = req.params.id
        try {   
            const count = await Message.count({
                where: { conversationId },
            });

            const messages = await Message.findAll({
                where: {conversationId},
                // Add order conditions here....
                order: [
                    ['id', 'ASC'],
                ],
                offset: count > 20 ? count - 20 : 0,
                //limit : 50,
            })
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getMessagesR2(req, res) {
        const conversationId = req.params.id
        const kol = req.params.count
        const prev = req.params.prev
        try {   
            const count = await Message.count({
                where: { conversationId },
            });
            const k = parseInt(kol) + parseInt(prev)
            //console.log("Всего сообщений спеца: ", count, k)
            
            const messages = await Message.findAll({
                where: {conversationId},
                // Add order conditions here....
                order: [
                    ['id', 'ASC'],
                ],
                offset: count > k ? count - k : 0,
                //limit : 50,
            })
            //console.log("messages count: ", messages.length)
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getAllMessagesR(req, res) {
        try {           
            const messages = await Message.findAll({
                order: [
                    ['id', 'ASC'], //DESC ASC
                ],
            })
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //выбрать сообщения с конца таблицы (последние)
    async getMessagesRCount(req, res) {
        const count = req.params.count
        try {   
            const countAll = await Message.count();
            //console.log("MessagesAll: ", countAll)

            const messages = await Message.findAll({
                order: [
                    ['id', 'ASC'],
                ],
                offset: countAll > count ? countAll - count : 0,
                //limit : 50,
            })
            //console.log("MessagesCount: ", messages.length)
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //delete message
    async delMessageR(req, res) {
        const id = req.params.id
        try {
            await Message.destroy({
                where: { messageId: String(id) },
            })
            return res.status(200).json("Message has been delete successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new RmessageController()