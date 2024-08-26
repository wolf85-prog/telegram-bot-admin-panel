const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
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


module.exports = {
    User, 
    Project, 
    Distribution,
    Report,
    Plan,
    CountMessage,
    ProjectNew
}