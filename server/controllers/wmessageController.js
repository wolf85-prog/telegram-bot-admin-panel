const {Message} = require('../models/workers')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class WmessageController {

    //add message
    async newMessageWorker(req, res) {
        const {conversationId, text, senderId, receiverId, type, isBot, messageId, buttons} = req.body
        try {
            await Message.create({conversationId, text, senderId, receiverId, type, isBot, messageId, buttons})
            return res.status(200).json("MessageW has been sent successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get message conversation
    async getMessagesWorker(req, res) {
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

    async getMessagesWorker2(req, res) {
        const conversationId = req.params.id
        const kol = req.params.count
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
                offset: count > kol ? count - kol : 0,
                //limit : 50,
            })
            console.log("messages count: ", messages.length)
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getAllMessagesWorker(req, res) {
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
    async getMessagesWorkerCount(req, res) {
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
    async delMessageWorker(req, res) {
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

module.exports = new WmessageController()