const {UserBot} = require('../models/models')
const ApiError = require('../error/ApiError')

class UserbotController {

    async create(req, res) {
        const {first_name, last_name, chatId} = req.body
        const userbot = await UserBot.create({first_name, last_name, chatId})
        return res.json(userbot)
    }

    async getAll(req, res) {
        const messages = await UserBot.findAll()
        return res.json(messages)
    }

    async getOne(req, res) {
        const {id} = req.params
        const userbot = await UserBot.findOne({where: {id}})
        return res.json(userbot)
    }
}

module.exports = new UserbotController()