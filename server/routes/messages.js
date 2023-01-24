const Router = require('express')
const router = new Router()
const {Message} = require('../models/Message')

//add
router.post("/", async (req, res) => { 
    const {conversationId, text, from} = req.body
    try {
       const savedMessage = await Message.create({conversationId, text, from})
       res.status(200).json(savedMessage);
    } catch (err) {
       res.status(500).json(err);
    }
});

//get message conversation
router.get("/:conversationId", async (req, res) => {
    const conversationId = req.params.conversationId
    try {
        const messages = await Message.findAll({where: {conversationId}})
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
  });

//get all
router.get("/", async (req, res) => {
    try {
        const messages = await Message.findAll()
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
  });

module.exports = router