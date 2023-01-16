const {Message} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class MessageController {

    async create(req, res) {
        const {textOrPathToFile} = req.body
        const message = await Message.create({textOrPathToFile})
        return res.json(message)
    }

    async getAll(req, res) {
        const messages = await Message.findAll()
        return res.json(messages)
    }

    async getOne(req, res) {

    }
}

module.exports = new MessageController()