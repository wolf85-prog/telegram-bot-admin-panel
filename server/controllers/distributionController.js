const { Distribution }= require('../models/models')
const ApiError = require('../error/ApiError')

class DistributionController {

    //add Distribution
    async newDistribution(req, res) {
        const {name, text, image, button, receivers, datestart, delivered} = req.body
        try {
            await Distribution.create({name, text, image, button, receivers, datestart, delivered})
            return res.status(200).json("Distribution has been sent successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getDistributions(req, res) {
        try {
            const distributions = await Distribution.findAll()
            return res.status(200).json(distributions);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getDistributionsId(req, res) {
        const {id} = req.params
        try {
            const distib = await Distribution.findAll({where: {chatId: id}})
            return res.status(200).json(distib);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getDistribution(req, res) {
        const {id} = req.params
        try {
            const distib = await Distribution.findOne({where: {id: id}})
            return res.status(200).json(distib);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    //delete message
    async delDistribution(req, res) {
        const id = req.params.id
        try {
            await Distribution.destroy({
                where: { id: String(id) },
            })
            return res.status(200).json("Distribution has been delete successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new DistributionController()