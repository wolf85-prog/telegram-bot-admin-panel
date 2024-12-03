const sequelize = require('../db_renthub')
const {DataTypes} = require('sequelize')

const Manager = sequelize.define('manager', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    chatId: {type: DataTypes.STRING, unique: true}, // telegram id
    fio: {type: DataTypes.STRING}, //фио менеджера
    phone: {type: DataTypes.STRING}, //телефон менеджера
    phone2: {type: DataTypes.STRING}, //телефон менеджера
    city: {type: DataTypes.STRING},
    dolgnost: {type: DataTypes.STRING},
    sfera: {type: DataTypes.TEXT}, 
    projects: {type: DataTypes.STRING}, 
    email: {type: DataTypes.STRING}, //почта менеджера
    inn: {type: DataTypes.STRING}, //инн компании
    comteg: {type: DataTypes.TEXT},
    comment: {type: DataTypes.TEXT}, 
    profile: {type: DataTypes.TEXT},
    dogovor: {type: DataTypes.BOOLEAN}, 
    block: {type: DataTypes.BOOLEAN},
    deleted: {type: DataTypes.BOOLEAN},
    great: {type: DataTypes.BOOLEAN}, //hello
    companyId: {type: DataTypes.STRING}, // id заказчика
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