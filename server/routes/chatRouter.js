const Router = require('express')
const router = new Router()
const chatController = require('../controllers/chatController')

router.get('/', chatController.chat)
router.get('/:id', chatController.chat)


module.exports = router