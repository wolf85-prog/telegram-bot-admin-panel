const Router = require('express')
const route = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { newMessage, delMessage, getMessages, getLastMessages, getAllMessages, getCountMessages, 
    newCountMessage, newCountWMessage, newCountProjects, newCountMessagePretendent,
 } = require('../controllers/messageController')
const { newConversation, getConversation, getConversations } = require('../controllers/conversationController')
const { addUser, getUsers, getUser, editUser, editUserAvatar} = require('../controllers/userbotController')
const { newDistribution, 
    getDistributions, 
    getDistributionsId, 
    getDistribution, 
    delDistribution,
    editDistrib,
    newDistributionW, 
    getDistributionsW, 
    getDistributionsCount,
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
const { getReports, getReportsId, getSoundNotif, delSoundNotif} = require('../controllers/reportController')
const { getProjects, getProjectsId, getProjectNew, getProjectsAll, getProjectsDelete, getProjectNewId, 
    getProjectNewCreate, getProjectNewUpdate, getProjectNewDel, getProjectNewChatId } = require('../controllers/projectController')
const { uploadFile, getImage, sendNarush } = require( "../controllers/fileController.js")

const { getUserWorkers, getUserWorker, editUserWorker} = require('../controllers/wuserbotController')
const { newMessageWorker, delMessageWorker, getMessagesWorker, getMessagesWorker2, getAllMessagesWorker, getMessagesWorkerCount } = require('../controllers/wmessageController')
const { newConversationWorker, getConversationWorker, getConversationsW } = require('../controllers/wconversationController')
const { getWorkers, getWorkersCount, getWorker, editWorker, blockWorker, getCanceled, getCanceledId, addCanceled, updateWorkers} = require('../controllers/workersController')
const { newPretendent, getPretendent, getPretendentId, getAllPretendent, 
    getAllPretendentCount, getPretendentProjectId, editPretendent } = require('../controllers/pretendentController')

const { newPlan, getPlan, addTimer } = require('../controllers/planController')

const { getSpecialist, getSpecCount, editSpecialist, getSpecialistId, addSpecialist, deleteSpecialist, getSpecCountAll, getSpecialistPhone, getSpecialistChatId, blockSpecialist, getPaginatedSpecialist, getSpecialistFilter} = require('../controllers/specialistController')

const { getManagers, getManagerCount, editManager, getManagerId, addManager, deleteManager, getManagerCountAll } = require('../controllers/managersController')

const { getCompanys, getCompanyCount, editCompany, getCompanyId, addCompany, deleteCompany, getCompanyCountAll } = require('../controllers/companysController')

const { getPlatforms, getPlatformCount, editPlatform, getPlatformId, addPlatform, deletePlatform, getPlatformCountAll } = require('../controllers/platformsController')

const { getMainSpecProject, getMainSpecId, editMainspec, deleteMainspec, addMainspec, getMainspecCountAll, deleteMainspecProject } = require('../controllers/mainspecController')

const { addCrmID, getCrmID } = require('../controllers/crmIDController')

//const upload = require( "../utils/upload.js")
//const upload = multer({dest:"uploads"});
const upload = require('../middleware/file')
const uploadDistrib = require('../middleware/fileDistrib') //папка для файлов в рассылках
const uploadAvatar = require('../middleware/fileAvatar')

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

//кол-во сообщений
route.get('/message/count/add/:count', newCountMessage)
route.get('/wmessage/count/add/:count', newCountWMessage)
route.get('/projects/count/add/:count', newCountProjects)
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
route.patch('/distributions/update/:id', editDistrib)

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

route.get('/distributionsw/count/get/:count/:prev', getDistributionsCount) //еще

//----------------SOUND NOTIFICATIONS--------------------------------
route.get('/soundnotif/get', getSoundNotif)
route.get('/soundnotif/del', delSoundNotif)

//-------------------------------------------------------------------
route.get('/reports/get', getReports)
route.get('/reports/get/:id', getReportsId)

route.get('/projects/get', getProjects)
route.get('/projects/get/:id', getProjectsId)
route.get('/projects/new/get', getProjectNew)

route.get('/projectnew/get', getProjectsAll)
route.get('/projectnew/delete/get', getProjectsDelete)
route.get('/projectnew/get/:id', getProjectNewId)
route.post('/projectnew/add', getProjectNewCreate)
route.patch('/projectnew/update/:id', getProjectNewUpdate)
route.get('/projectnew/delete/:id', getProjectNewDel)
route.get('/projectnew/chat/get/:id', getProjectNewChatId)

route.post("/file/upload", upload.single("photo"), uploadFile);
route.post("/file/distrib", uploadDistrib.single("photo"), uploadFile);
route.post("/file/avatar", uploadAvatar.single("avatar"), uploadFile);
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
route.post('/canceled/add', addCanceled) //еще
route.post('/canceled/project/get', getCanceledId) //еще

route.post('/pretendent/add', newPretendent)
route.get('/pretendent/get/:id', getPretendentId)
route.post('/pretendent/get', getPretendent)
route.get('/pretendents/get', getAllPretendent)
route.get('/pretendents/count/get/:count/:prev', getAllPretendentCount) //еще
route.get('/pretendent/project/get/:id', getPretendentProjectId) //претенденты в проекте
route.patch('/pretendent/update/:id', editPretendent)

//------------------PLAN-----------------------------------
route.post('/plan/add', newPlan)
route.get('/plan/get/:date', getPlan)
route.post('/plan/timer/add', addTimer)

//-----------------POSTER---------------------------------
//route.post('/poster/send', sendPoster)


//-----------------НАРУШИТЕЛИ---------------------------------
route.get('/sounds/narush', sendNarush)

//-----------------Обновление данных профиля---------------------------------
route.get('/workers/update/get', updateWorkers)


//----------------- Специалисты ---------------------------------
route.get('/specialist', getPaginatedSpecialist)
route.get('/specialist/get', getSpecialist)
route.get('/specialist/get/filter', getSpecialistFilter)
route.get("/specialist/:id", getSpecialistId);
route.get('/specialist/count/get/:count/:prev', getSpecCount) //еще
route.patch('/specialist/update/:id', editSpecialist)
route.get("/specialist/delete/:id", deleteSpecialist);
route.post("/specialist/add", addSpecialist);
route.get("/specialist/count/get", getSpecCountAll);
route.get("/specialist/phone/:id", getSpecialistPhone);
route.get("/specialist/chat/:id", getSpecialistChatId);
route.get('/specialist/block/:id', blockSpecialist)



//----------------- Менеджеры ---------------------------------
route.get('/managers/get', getManagers)
route.get("/managers/:id", getManagerId);
route.get('/managers/count/get/:count/:prev', getManagerCount) //еще
route.patch('/managers/update/:id', editManager)
route.get("/managers/delete/:id", deleteManager);
route.post("/managers/add", addManager);
route.get("/managers/count/get", getManagerCountAll);
route.get("/managers/chat/:id", getManagerId);

//----------------- Компании ---------------------------------
route.get('/companys/get', getCompanys)
route.get("/companys/:id", getCompanyId);
route.get('/companys/count/get/:count/:prev', getCompanyCount) //еще
route.patch('/companys/update/:id', editCompany)
route.get("/companys/delete/:id", deleteCompany);
route.post("/companys/add", addCompany);
route.get("/companys/count/get", getCompanyCountAll);

//----------------- Площадки ---------------------------------
route.get('/platforms/get', getPlatforms)
route.get("/platforms/:id", getPlatformId);
route.get('/platforms/count/get/:count/:prev', getPlatformCount) //еще
route.patch('/platforms/update/:id', editPlatform)
route.get("/platforms/delete/:id", deletePlatform);
route.post("/platforms/add", addPlatform);
route.get("/platforms/count/get", getPlatformCountAll);

//----------------- Основной состав (специалисты) ---------------------------------
route.get('/mainspec/project/get/:id', getMainSpecProject)
route.get("/mainspec/:id", getMainSpecId);
//route.get('/mainspec/count/get/:count/:prev', getMainspecCount) //еще
route.patch('/mainspec/update/:id', editMainspec)
route.get("/mainspec/delete/:id", deleteMainspec);
route.get("/mainspec/project/delete/:id", deleteMainspecProject);
route.post("/mainspec/add", addMainspec);
route.get("/mainspec/count/get", getMainspecCountAll);

route.get("/crmid/add", addCrmID);
route.get("/crmid/get", getCrmID);

module.exports = route