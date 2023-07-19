const {Plan} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class PlanController {

    //add plan
    async newPlan(req, res) {
        const {datestart, times} = req.body
        console.log(datestart)
        try {
            // First try to find the record
            const foundItem = await Plan.findOne({ where: {datestart} });

            if (!foundItem) {
                // Item not found, create a new one
                const newPlan = await Plan.create({datestart, times})
                return  {newPlan, created: true};
            }

            // Found an item, update it
            const item = await Plan.update({times: times},{where: {datestart: datestart}});
            //обновить 
            //await Project.update({projectId: projectId},{where: {id: res.id}})
            return {item, created: false};

            //const newPlan = await Plan.create({datestart, times})
            //return res.status(200).json("Plan has been save successfully");
            //return res.status(200).json(newPlan);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get plans
    async getPlan(req, res) {
        const date = req.params.date
        try {           
            const plan = await Plan.findOne({
                where: {datestart: date}
            })
            return res.status(200).json(plan);
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