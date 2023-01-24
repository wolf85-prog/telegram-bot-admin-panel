const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')
const messageRouter = require('./messageRouter')
const userBotRouter = require('./userBotRouter')

router.use('/user', userRouter)
router.use('/chat', chatRouter)
router.use('/message', messageRouter)
router.use('/userbots', userBotRouter)

module.exports = router