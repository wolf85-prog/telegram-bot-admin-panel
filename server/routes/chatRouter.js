const Router = require('express')
const router = new Router()
const chatController = require('../controllers/chatController')

router.get('/chats', chatController)


module.exports = router