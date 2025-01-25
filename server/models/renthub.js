const sequelize = require('../db_renthub')
const {DataTypes} = require('sequelize')

const Manager = sequelize.define('manager', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fio: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING}, //unique: true
    phone: {type: DataTypes.STRING}, //телефон менеджера
    phone2: {type: DataTypes.STRING}, //телефон менеджера
    city: {type: DataTypes.STRING},
    dolgnost: {type: DataTypes.STRING}, 
    companyId: {type: DataTypes.STRING}, // id заказчика  
    projects: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING}, //почта менеджера
    comteg: {type: DataTypes.STRING},
    worklist: {type: DataTypes.STRING},
    dogovor: {type: DataTypes.BOOLEAN}, 
    block: {type: DataTypes.BOOLEAN},
    deleted: {type: DataTypes.BOOLEAN},
    great: {type: DataTypes.BOOLEAN}, //hello
    sfera: {type: DataTypes.TEXT},
    comment: {type: DataTypes.TEXT}, 
    avatar: {type: DataTypes.TEXT},
    GUID: {type: DataTypes.STRING}, 
})

const Company = sequelize.define('company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    title: {type: DataTypes.STRING}, //
    city: {type: DataTypes.STRING},
    office: {type: DataTypes.STRING},
    sklad: {type: DataTypes.STRING},
    comment: {type: DataTypes.TEXT},
    projects: {type: DataTypes.TEXT},
    managers: {type: DataTypes.TEXT},
    dogovorDate: {type: DataTypes.STRING}, 
    dogovorNumber: {type: DataTypes.STRING}, 
    bugalterFio: {type: DataTypes.STRING}, 
    bugalterEmail: {type: DataTypes.STRING},
    bugalterPhone: {type: DataTypes.STRING},  
    GUID: {type: DataTypes.STRING}, 
    inn: {type: DataTypes.STRING}, //инн компании
    profile: {type: DataTypes.STRING},
    sfera: {type: DataTypes.TEXT},
    comteg: {type: DataTypes.TEXT},
})

module.exports = {
    Manager,
    Company,
}