const Router = require('express')
const route = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { newMessage, delMessage, getMessages, getAllMessages } = require('../controllers/messageController')
const { newConversation, getConversation } = require('../controllers/conversationController')
const { addUser, getUsers, getUser, editUser, editUserAvatar} = require('../controllers/userbotController')
const { newDistribution, getDistributions, getDistributionsId, getDistribution, delDistribution } = require('../controllers/distributionController')
const { getReports, getReportsId } = require('../controllers/reportController')
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
route.delete('/message/delete/:id', delMessage)
route.get('/message/get', getAllMessages)
route.get('/message/get/:id', getMessages)

route.post('/conversation/add', newConversation)
route.get('/conversation/get/:id', getConversation)

//route.post('/userbots/add', addUser)
route.get('/userbots/get', getUsers)
route.get('/userbots/get/:id', getUser)
route.patch('/userbots/update/:id', editUser)
route.patch('/userbots/updatefile/:id', editUserAvatar)

route.post('/distribution/add', newDistribution)
route.get('/distributions/get', getDistributions)
route.get('/distribution/get/:id', getDistribution)
route.delete('/distributions/delete/:id', delDistribution)

route.get('/reports/get', getReports)
route.get('/reports/get/:id', getReportsId)

route.post("/file/upload", upload.single("photo"), uploadFile);
route.get("/file/:filename", getImage);

module.exports = route