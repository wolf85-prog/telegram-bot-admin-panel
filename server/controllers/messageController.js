const Message = require('../models/Message')
const {CountMessage} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class MessageController {

    //add count message
    async newCountMessage(req, res) {
        const count = req.params.count
        try {
            await CountMessage.update({managers: count}, {where: {id: 1}})

            return res.status(200).json("Message has been sent successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //add count message
    async newCountWMessage(req, res) {
        const count = req.params.count
        try {
            await CountMessage.update({workers: count}, {where: {id: 1}})

            return res.status(200).json("Message has been sent successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //add count message
    async newCountMessagePretendent(req, res) {
        const count = req.params.count
        try {
            await CountMessage.update({pretendents: count}, {where: {id: 1}})

            return res.status(200).json("Message has been sent successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

//------------------------------------------------------------------------------

    //count message
    async getCountMessages(req, res) {
        try {           
            const count = await CountMessage.findOne({
                where: {id: 1},
            })
            return res.status(200).json(count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    //add message
    async newMessage(req, res) {
        const {conversationId, text, senderId, receiverId, type, messageId, buttons} = req.body
        try {
            await Message.create({conversationId, text, senderId, receiverId, type, messageId, buttons})
            return res.status(200).json("Message has been sent successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get message conversation
    async getMessages(req, res) {
        const conversationId = req.params.id
        try {           
            const count = await Message.count({
                where: { conversationId },
              });
            //console.log("Количество сообщений: ", count)

            const messages = await Message.findAll({
                where: {conversationId},
                // Add order conditions here....
                order: [
                    ['id', 'ASC'], //DESC
                ],
                offset: count > 150 ? count - 150 : 0,
                //limit : 50,
            })
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get message conversation
    async getLastMessages(req, res) {
        const conversationId = req.params.id
        try {           

            const messages = await Message.findOne({
                where: {conversationId},
                // последнее сообщение
                order: [ 
                    [ 'createdAt', 'DESC' ]
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

    //delete message
    async delMessage(req, res) {
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

module.exports = new MessageController()