const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const UserBot = sequelize.define('userbot', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING, unique: true},
    username: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING},
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    conversationId: {type: DataTypes.STRING},
    senderId: {type: DataTypes.STRING},
    receiverId: {type: DataTypes.STRING},    
    text: {type: DataTypes.TEXT},     //текст сообщения;
    type: {type: DataTypes.STRING},      //тип сообщения;
    is_bot: {type: DataTypes.BOOLEAN},
    messageId: {type: DataTypes.STRING},
    buttons: {type: DataTypes.STRING},   //названия кнопок;
    replyId: {type: DataTypes.STRING}, //id пересылаемого сообщения
})

const Conversation = sequelize.define('conversation', {
    members: {type: DataTypes.ARRAY(DataTypes.STRING)},
})

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},  //название проекта
    datestart: {type: DataTypes.STRING},  //дата начала проекта
    spec: {type: DataTypes.STRING},
    equipment: {type: DataTypes.STRING},
    teh: {type: DataTypes.STRING},
    geo: {type: DataTypes.STRING},
    managerId: {type: DataTypes.STRING},
    companyId: {type: DataTypes.STRING},
    projectId: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING},
})

const Distribution = sequelize.define('distribution', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: {type: DataTypes.STRING},  //название рассылки
    text: {type: DataTypes.STRING}, //текст сообщения;
    image: {type: DataTypes.STRING}, //ссылка на картинку;
    button: {type: DataTypes.STRING}, //текст кнопки;
    receivers: {type: DataTypes.TEXT}, //массив получателей;
    datestart: {type: DataTypes.STRING},  //дата начала рассылки
    delivered: {type: DataTypes.BOOLEAN}, //доставлено
})


const Distributionw = sequelize.define('distributionw', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    text: {type: DataTypes.STRING}, //текст сообщения;
    image: {type: DataTypes.STRING}, //ссылка на картинку;
    project: {type: DataTypes.STRING}, //проект (название);
    receivers: {type: DataTypes.STRING}, //массив получателей;
    datestart: {type: DataTypes.STRING},  //дата начала рассылки
    delivered: {type: DataTypes.BOOLEAN}, //доставлено
    projectId: {type: DataTypes.STRING}, //проект (id);
    count: {type: DataTypes.INTEGER}, 
    date: {type: DataTypes.STRING},  //дата начала рассылки  
    users: {type: DataTypes.TEXT},
    button: {type: DataTypes.STRING}, //текст кнопки;
    uuid: {type: DataTypes.STRING}, //индекс рассылки;
    success: {type: DataTypes.INTEGER}, 
    report: {type: DataTypes.TEXT},
    editButton: {type: DataTypes.BOOLEAN}, //редактируемая кнопка
    stavka: {type: DataTypes.BOOLEAN}, //альтернативная ставка кнопка
    target: {type: DataTypes.STRING}, //ссылка;
    type: {type: DataTypes.INTEGER}, //тип файла
})

const Report = sequelize.define('report', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: {type: DataTypes.STRING},  //название проекта
    text: {type: DataTypes.STRING}, //текст сообщения;
    receiverId: {type: DataTypes.STRING}, //чат-id получателя;
    date: {type: DataTypes.STRING},  //дата отправки отчета
    delivered: {type: DataTypes.BOOLEAN}, //доставлено
})

const SoundNotif = sequelize.define('soundnotifs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: {type: DataTypes.STRING},  //название проекта
    text: {type: DataTypes.STRING}, //текст сообщения;
    date: {type: DataTypes.STRING},  //дата отправки отчета
    delivered: {type: DataTypes.BOOLEAN}, //доставлено
})

const Pretendent = sequelize.define('pretendent', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    projectId: {type: DataTypes.STRING},  //id проекта
    workerId: {type: DataTypes.STRING}, //id специалиста;
    receiverId: {type: DataTypes.STRING}, //чат-id получателя;
    accept: {type: DataTypes.BOOLEAN}, //принято
    otclick: {type: DataTypes.INTEGER}, //количество согласий
    cancel: {type: DataTypes.INTEGER}, // количество отказов
    blockDistrib: {type: DataTypes.BOOLEAN}, //блокировка рассылки по проекту
})

const Plan = sequelize.define('plan', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    datestart: {type: DataTypes.STRING},  //дата начала рассылки
    times: {type: DataTypes.TEXT},  //json часов проектов
})

const CountMessage = sequelize.define('countmessage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    managers: {type: DataTypes.INTEGER},
    projects: {type: DataTypes.INTEGER},
    workers: {type: DataTypes.INTEGER},
    pretendents: {type: DataTypes.INTEGER},
})

const ProjectNew = sequelize.define('projectnew', {
    id: {type: DataTypes.STRING, primaryKey: true}, // id проекта
    name: {type: DataTypes.STRING},  //название проекта
    datestart: {type: DataTypes.STRING}, //начало
    crmID: {type: DataTypes.STRING},
})

const Specialist = sequelize.define('specialist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},  
    fio: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.STRING},
    phone2: {type: DataTypes.STRING},
    specialization: {type: DataTypes.TEXT},  
    city: {type: DataTypes.STRING},
    skill: {type: DataTypes.TEXT},
    promoId: {type: DataTypes.STRING}, 
    rank: {type: DataTypes.INTEGER}, 
    merch: {type: DataTypes.STRING},
    company: {type: DataTypes.STRING},
    comteg: {type: DataTypes.TEXT},
    comteg2: {type: DataTypes.TEXT},
    comment: {type: DataTypes.TEXT}, 
    comment2: {type: DataTypes.TEXT}, 
    age: {type: DataTypes.STRING},
    reyting: {type: DataTypes.STRING},
    inn: {type: DataTypes.STRING}, 
    passport: {type: DataTypes.TEXT},
    profile: {type: DataTypes.TEXT},
    dogovor: {type: DataTypes.BOOLEAN}, 
    samozanjatost: {type: DataTypes.BOOLEAN},
    passportScan: {type: DataTypes.TEXT},
    email: {type: DataTypes.STRING},  
    block: {type: DataTypes.BOOLEAN},
    deleted: {type: DataTypes.BOOLEAN},
    great: {type: DataTypes.BOOLEAN}, //hello
    block18: {type: DataTypes.BOOLEAN},
})


module.exports = {
    User, 
    UserBot, 
    Message, 
    Conversation, 
    Project, 
    Distribution,
    Distributionw,
    Report,
    SoundNotif,
    Pretendent,
    Plan,
    CountMessage,
    ProjectNew,
    Specialist,
}