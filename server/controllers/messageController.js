const Message = require('../models/Message')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class MessageController {

    //add message
    async newMessage(req, res) {
        const {conversationId, text, senderId, receiverId, type, messageId} = req.body
        try {
            await Message.create({conversationId, text, senderId, receiverId, type, messageId})
            return res.status(200).json("Message has been sent successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get message conversation
    async getMessages(req, res) {
        const conversationId = req.params.id
        try {           
            const messages = await Message.findAll({
                where: {conversationId},
                // Add order conditions here....
                order: [
                    ['id', 'ASC'],
                ],
            })
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getAllMessages(req, res) {
        try {           
            const messages = await Message.findAll()
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new MessageController()