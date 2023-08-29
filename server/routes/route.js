const Router = require('express')
const route = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { newMessage, delMessage, getMessages, getAllMessages } = require('../controllers/messageController')
const { newConversation, getConversation } = require('../controllers/conversationController')
const { addUser, getUsers, getUser, editUser, editUserAvatar} = require('../controllers/userbotController')
const { newDistribution, 
    getDistributions, 
    getDistributionsId, 
    getDistribution, 
    delDistribution,
    newDistributionW, 
    getDistributionsW, 
    getDistributionsWPlan, 
    getDistributionsWId, 
    getDistributionW, 
    delDistributionW,
    delDistributionWPlan,
    editDistribW,
} = require('../controllers/distributionController')
const { getReports, getReportsId } = require('../controllers/reportController')
const { getProjects, getProjectsId } = require('../controllers/projectController')
const { uploadFile, getImage } = require( "../controllers/fileController.js")

const { getUserWorkers, getUserWorker, editUserWorker} = require('../controllers/wuserbotController')
const { newMessageWorker, delMessageWorker, getMessagesWorker, getAllMessagesWorker } = require('../controllers/wmessageController')
const { newConversationWorker, getConversationWorker } = require('../controllers/wconversationController')
const { getWorkers, getWorker, editWorker} = require('../controllers/workersController')
const { newPretendent, getPretendent } = require('../controllers/pretendentController')

const { newPlan, getPlan, addTimer } = require('../controllers/planController')

//const { sendPoster } = require('../controllers/posterController')

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

route.post('/distributionw/add', newDistributionW)
route.get('/distributionsw/get', getDistributionsW)
route.get('/distributionsw/plan/get', getDistributionsWPlan)
route.get('/distributionw/get/:id', getDistributionW)
route.delete('/distributionsw/delete/:id', delDistributionW)
route.post('/distributionsw/delete', delDistributionWPlan)
route.patch('/distributionsw/update/:id', editDistribW)

route.get('/reports/get', getReports)
route.get('/reports/get/:id', getReportsId)

route.get('/projects/get', getProjects)
route.get('/projects/get/:id', getProjectsId)

route.post("/file/upload", upload.single("photo"), uploadFile);
route.get("/file/:filename", getImage);


//----------------WORKERS--------------------------------
route.get('/wuserbots/get', getUserWorkers)
route.get('/wuserbots/get/:id', getUserWorker)
route.patch('/wuserbots/update/:id', editUserWorker)

route.post('/wmessage/add', newMessageWorker)
route.delete('/wmessage/delete/:id', delMessageWorker)
route.get('/wmessage/get', getAllMessagesWorker)
route.get('/wmessage/get/:id', getMessagesWorker)

route.post('/wconversation/add', newConversationWorker)
route.get('/wconversation/get/:id', getConversationWorker)

route.get('/workers/get', getWorkers)
route.get('/workers/get/:id', getWorker)
route.patch('/workers/update/:id', editWorker)

route.post('/pretendent/add', newPretendent)
route.get('/pretendent/get/:id', getPretendent)

//------------------PLAN-----------------------------------
route.post('/plan/add', newPlan)
route.get('/plan/get/:date', getPlan)
route.post('/plan/timer/add', addTimer)

//-----------------POSTER---------------------------------
//route.post('/poster/send', sendPoster)

module.exports = route