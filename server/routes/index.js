const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')
const messageRouter = require('./messageRouter')
const userBotRouter = require('./userBotRouter')

const userbotController = require('../controllers/userbotController')
const authMiddleware = require('../middleware/authMiddleware')

router.use('/user', userRouter)
router.use('/chat', chatRouter)
router.use('/message', messageRouter)
router.use('/userbots', userBotRouter)

//chat
//--------------------------------------------------
// router.post("/add", addUser);
// router.get("/users", getUsers);

// router.post('/add', userbotController.create)
// router.get('/userbots', userbotController.getAll)
// router.get('/:id', userbotController.getOne)


// router.post("/conversation/add", newConversation);
// router.post("/conversation/get", getConversation);

// router.post("/message/add", newMessage);
// router.get("/message/get/:id", getMessages);

// router.post("/file/upload", upload.single("file"), uploadFile);
// router.get("/file/:filename", getImage);

module.exports = router