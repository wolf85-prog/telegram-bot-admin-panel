const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Specialist = sequelize.define('specialist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    phone2: {type: DataTypes.STRING},
    specialization: {type: DataTypes.STRING},  
    city: {type: DataTypes.STRING},
    age: {type: DataTypes.STRING},
    rank: {type: DataTypes.INTEGER}, 
    comment: {type: DataTypes.TEXT}, 
    comment2: {type: DataTypes.TEXT}, 
    company: {type: DataTypes.STRING},
    merch: {type: DataTypes.STRING},
    reyting: {type: DataTypes.STRING},
    comteg: {type: DataTypes.STRING},
    comteg2: {type: DataTypes.STRING},
    profile: {type: DataTypes.STRING},
    passportScan: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING}, 
    promoId: {type: DataTypes.INTEGER}, 
    dogovor: {type: DataTypes.BOOLEAN}, 
    passport: {type: DataTypes.TEXT},
    inn: {type: DataTypes.STRING}, 
    samozanjatost: {type: DataTypes.BOOLEAN},
    acceptConfidential: {type: DataTypes.BOOLEAN}, 
    acceptOferta: {type: DataTypes.BOOLEAN}, 
    date: {type: DataTypes.STRING}, 
    mailingAddress: {type: DataTypes.STRING}, 
})



module.exports = {
    Specialist,
}