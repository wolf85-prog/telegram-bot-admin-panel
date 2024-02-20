const {Report, SoundNotif} = require('../models/models')
const ApiError = require('../error/ApiError')

class ReportController {

    async getReports(req, res) {
        try {
            const users = await Report.findAll()
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getReportsId(req, res) {
        const {id} = req.params
        try {
            const reports = await Report.findAll({where: {chatId: id}})
            return res.status(200).json(reports);
        } catch (err) {
            return res.status(500).json(err);
        }
    }


    async getSoundNotif(req, res) {
        try {
            console.log("start get notif")
            const notifs = await SoundNotif.findAll()
            return res.status(200).json(notifs);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new ReportController()