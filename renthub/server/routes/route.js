const Router = require('express')
const route = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const { getReports, getReportsId } = require('../controllers/reportController')
const { getProjects, getProjectsId, getProjectNew, getProjectNewId, getProjectNewCreate, getProjectNewUpdate, getProjectNewDel } = require('../controllers/projectController')
const { uploadFile, getImage } = require( "../controllers/fileController.js")

const { getRmanagers, getRmanager, editRmanager, getRManagerCount } = require( "../controllers/rmanagersController.js")
const { newMessageR,delMessageR, getAllMessagesR, getMessagesR, getMessagesRCount, getMessagesR2 } = require( "../controllers/rmessageController.js")
const { getUsersRenthub, getUserRenthub, editUserRenthub } = require( "../controllers/ruserbotController.js")
const { newConversationR, getConversationR, getConversationsR } = require( "../controllers/rconversationController.js")



const upload = require('../middleware/file')
const uploadDistrib = require('../middleware/fileDistrib') //папка для файлов в рассылках

route.post('/user/registration', userController.registration)
route.post('/user/login', userController.login)
route.get('/user/auth', authMiddleware, userController.check)
route.get('/user/get', authMiddleware, userController.getAll)
route.get('/user/get/:id', authMiddleware, userController.getOne)


//----------------RENTHUB--------------------------------
route.get('/userbots/get', getUsersRenthub)
route.get('/userbots/get/:id', getUserRenthub)
route.patch('/userbots/update/:id', editUserRenthub)

route.post('/message/add', newMessageR)
route.delete('/message/delete/:id', delMessageR)
route.get('/message/get', getAllMessagesR)
route.get('/message/get/:id', getMessagesR)
route.get('/message/get/count/:count', getMessagesRCount)
route.get('/message2/get/:id/:count/:prev', getMessagesR2) //еще

route.post('/conversation/add', newConversationR)
route.get('/conversation/get/:id', getConversationR)
route.get('/conversations/get', getConversationsR)

route.get('/managers/get', getRmanagers)
route.get('/managers/get/:id', getRmanager)
route.patch('/managers/update/:id', editRmanager)
//route.get('/manager/block/:id', blockWorker)
route.get('/managers/count/get/:count/:prev', getRManagerCount) //еще



//-------------------------------------------------------------------
route.get('/reports/get', getReports)
route.get('/reports/get/:id', getReportsId)

route.get('/projects/get', getProjects)
route.get('/projects/get/:id', getProjectsId)
route.get('/projectnew/get', getProjectNew)
route.get('/projectnew/get/:id', getProjectNewId)

route.post('/projectnew/add', getProjectNewCreate)
route.post('/projectnew/update', getProjectNewUpdate)
route.post('/projectnew/del', getProjectNewDel)

// route.post("/file/upload", upload.single("photo"), uploadFile);
// route.post("/file/distrib", uploadDistrib.single("photo"), uploadFile);
route.get("/file/:filename", getImage);



module.exports = route