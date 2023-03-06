const Router = require('express')
const route = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { newMessage, getMessages, getAllMessages } = require('../controllers/messageController')
const { newConversation, getConversation } = require('../controllers/conversationController')
const { addUser, getUsers, getUser } = require('../controllers/userbotController')
const { uploadFile, getImage } = require( "../controllers/fileController.js")
//const upload = require( "../utils/upload.js")
//const upload = multer({dest:"uploads"});
const upload = require('../middleware/file')

route.post('/user/registration', userController.registration)
route.post('/user/login', userController.login)
route.get('/user/auth', authMiddleware, userController.check)
route.get('/user/get', authMiddleware, userController.getAll)
route.get('/user/get/:id', authMiddleware, userController.getOne)

route.post('/message/add', newMessage)
route.get('/message/get', getAllMessages)
route.get('/message/get/:id', getMessages)

route.post('/conversation/add', newConversation)
route.get('/conversation/get/:id', getConversation)

//route.post('/userbots/add', addUser)
route.get('/userbots/get', getUsers)
route.get('/userbots/get/:id', getUser)

route.post("/file/upload", upload.single("filedata"), uploadFile);
route.get("/file/:filename", getImage);

module.exports = route