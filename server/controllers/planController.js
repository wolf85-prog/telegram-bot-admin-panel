const {Plan} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class PlanController {

    //add plan
    async newPlan(req, res) {
        const {datestart, times} = req.body
        try {
            await Plan.create({datestart, times})
            return res.status(200).json("Plan has been save successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get plans
    async getAllPlans(req, res) {
        try {           
            const plans = await Plan.findAll()
            return res.status(200).json(plans);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //delete plan
    async delPlan(req, res) {
        const id = req.params.id
        try {
            await Plan.destroy({
                where: { messageId: String(id) },
            })
            return res.status(200).json("Message has been delete successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new PlanController()