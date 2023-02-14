import express, { Router } from "express"
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { newMessage, getMessages, getAllMessages } = require('../controllers/messageController')
const { newConversation, getConversation } = require('../controllers/conversationController')
const { addUser, getUsers, getUser } = require('../controllers/userbotController')
// const { uploadFile, getImage } = require( "../controller/image-controller.js")
// const upload = require( "../utils/upload.js")

const route = express.Router();

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

route.post('/userbots/add', addUser)
route.get('/userbots/get', getUsers)
route.get('/userbots/get/:id', getUser)

// route.post("/file/upload", upload.single("file"), uploadFile);
// route.get("/file/:filename", getImage);

export default route;