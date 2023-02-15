const Conversation = require("../models/Conversation");
const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')

class ConversationController {

    //создать беседу
    async newConversation(req, res) {        
        try {
            const {senderId, receiverId} = req.body

            //найти беседу
            const exist = await Conversation.findOne({
                where: { 
                    members: {
                        [Op.contains]: [senderId]
                    } 
                },
            }) 
            if (exist.length !== 0) {
                return response.status(200).json(`conversation already exist`);
            }

            await Conversation.create({
                members: [senderId, receiverId]
            }) 
            return res.status(200).json(`coversation saved sucessfully`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    async getConversation(req, res) {  
        try {
            const chatId = req.params.id
    
            const conversation = await Conversation.findOne({
                where: {
                    members: {
                        [Op.contains]: [chatId]
                    }
                },
            })
            return res.status(200).json(conversation);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new ConversationController()