const Router = require('express')
const router = new Router()
const { Op } = require('sequelize')
//const Conversation = require('../models/Conversation')
const {Conversation} = require('../models/models')

router.post("/", async (req, res)=> {
    //const newConversation = new Conversation()
    const {senderId, receiverId} = req.body

    // Create a conversation
    const conversation = {
        members: [senderId, receiverId],
    };
    
    try {
      const savedConversation = await Conversation.create(conversation)
      res.status(200).json(savedConversation)  
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:chatId", async (req, res)=>{
    const chatId = req.params.chatId
    try {
        const conversation = await Conversation.findAll({

            where: {
                members: {
                    [Op.contains]: [chatId]
                }
            },
        })
        res.status(200).json(conversation)
    } catch (error) {
       res.status(500).json(error) 
       console.log(error)
    }
})

module.exports = router