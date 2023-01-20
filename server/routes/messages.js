const Router = require('express')
const router = new Router()
const {Message} = require('../models/Message')

//add
router.post("/", async (req, res) => { 
    const {text} = req.body
    try {
       const savedMessage = await Message.create({text})
       res.status(200).json(savedMessage);
    } catch (err) {
       res.status(500).json(err);
    }
});

//get
router.get("/:conversationId", async (req, res) => {
    const conversationId = req.params.conversationId
    try {
        const messages = await Message.findOne({where: {conversationId}})
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
  });

module.exports = router