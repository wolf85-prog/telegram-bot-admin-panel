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
            return res.status(200).json("Message has been sent successfully");
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
                offset: count > 60 ? count - 60 : 0,
                //limit : 50,
            })
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getAllMessagesWorker(req, res) {
        try {           
            const messages = await Message.findAll()
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