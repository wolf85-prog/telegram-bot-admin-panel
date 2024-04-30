const Router = require('express')
const route = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { newMessage, delMessage, getMessages, getLastMessages, getAllMessages, getCountMessages, 
    newCountMessage, newCountWMessage, newCountMessagePretendent,
 } = require('../controllers/messageController')
const { newConversation, getConversation, getConversations } = require('../controllers/conversationController')
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
    editDistribW2,
    editDistribWPlan,
    sendDistribW,
    delMessagesDistribW,
    editDistribWAll,
} = require('../controllers/distributionController')
const { getReports, getReportsId, getSoundNotif } = require('../controllers/reportController')
const { getProjects, getProjectsId } = require('../controllers/projectController')
const { uploadFile, getImage, sendNarush } = require( "../controllers/fileController.js")

const { getUserWorkers, getUserWorker, editUserWorker} = require('../controllers/wuserbotController')
const { newMessageWorker, delMessageWorker, getMessagesWorker, getMessagesWorker2, getAllMessagesWorker, getMessagesWorkerCount } = require('../controllers/wmessageController')
const { newConversationWorker, getConversationWorker, getConversationsW } = require('../controllers/wconversationController')
const { getWorkers, getWorkersCount, getWorker, editWorker, blockWorker} = require('../controllers/workersController')
const { newPretendent, getPretendent, getPretendentId, getAllPretendent, getAllPretendentCount } = require('../controllers/pretendentController')

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
route.get('/message/last/get/:id', getLastMessages)

route.get('/message/count/get', getCountMessages)

route.get('/message/count/add/:count', newCountMessage)
route.get('/wmessage/count/add/:count', newCountWMessage)
route.get('/pretendent/count/add/:count', newCountMessagePretendent)


route.post('/conversation/add', newConversation)
route.get('/conversation/get/:id', getConversation)
route.get('/conversations/get', getConversations)

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
route.patch('/distributionsw2/update/:id', editDistribW2)
route.patch('/distributionswall/update/:id', editDistribWAll)
route.post('/distributionsw/plan/update', editDistribWPlan)

route.get('/distributionsw/send/:id', sendDistribW)
route.get('/distributionsw/delmessages/:id', delMessagesDistribW)

//----------------SOUND NOTIFICATIONS--------------------------------
route.get('/soundnotif/get', getSoundNotif)

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
route.get('/wmessage/get/count/:count', getMessagesWorkerCount)
route.get('/wmessage2/get/:id/:count/:prev', getMessagesWorker2) //еще

route.post('/wconversation/add', newConversationWorker)
route.get('/wconversation/get/:id', getConversationWorker)
route.get('/wconversations/get', getConversationsW)

route.get('/workers/get', getWorkers)
route.get('/workers/get/:id', getWorker)
route.patch('/workers/update/:id', editWorker)
route.get('/workers/block/:id', blockWorker)
route.get('/workers/count/get/:count/:prev', getWorkersCount) //еще

route.get('/canceled/get', getCanceled) //еще

route.post('/pretendent/add', newPretendent)
route.get('/pretendent/get/:id', getPretendentId)
route.post('/pretendent/get', getPretendent)
route.get('/pretendents/get', getAllPretendent)
route.get('/pretendents/count/get/:count/:prev', getAllPretendentCount) //еще

//------------------PLAN-----------------------------------
route.post('/plan/add', newPlan)
route.get('/plan/get/:date', getPlan)
route.post('/plan/timer/add', addTimer)

//-----------------POSTER---------------------------------
//route.post('/poster/send', sendPoster)


//-----------------НАРУШИТЕЛИ---------------------------------
route.get('/sounds/narush', sendNarush)

module.exports = route