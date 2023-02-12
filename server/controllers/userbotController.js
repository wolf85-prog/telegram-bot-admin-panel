const {UserBot} = require('../models/models')
const ApiError = require('../error/ApiError')

class UserbotController {

    async create(req, res) {
        const {first_name, last_name, chatId} = req.body
        const userbot = await UserBot.create({first_name, last_name, chatId})
        return res.json(userbot)
    }

    async getAll(req, res) {
        const users = await UserBot.findAll()
        return res.json(users)
    }

    async getOne(req, res) {
        const {id} = req.params
        try {
            const userbot = await UserBot.findOne({where: {chatId: id}})
            return res.status(200).json(userbot);
          } catch (err) {
            return res.status(500).json(err);
          }
    }
}

module.exports = new UserbotController()