const {Plan, Distributionw, Pretendent} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
//const { editDistributionW } = require('./../../client/src/http/adminAPI')

//const { useUsersContext }  = require("./../../client/src/chat-app-new/context/usersContext");

//fetch api
const fetch = require('node-fetch');

const token = process.env.TELEGRAM_API_TOKEN_WORK
const host_api_bottest = process.env.BOTTEST_API_URL

let tasks = []

class PlanController {

    //add plan
    async newPlan(req, res) {
        const {datestart, times} = req.body
        //console.log(datestart)
        try {
            // First try to find the record
            const foundItem = await Plan.findOne({ where: {datestart: datestart} });
            //console.log(foundItem)

            if (!foundItem) {
                // Item not found, create a new one
                const newPlan = await Plan.create({datestart, times})
                return res.status(200).json(newPlan);
            }

            // Found an item, update it
            const item = await Plan.update({times: times},{where: {datestart: datestart}});

            return res.status(200).json("Plan has been update successfully");
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

    //get plans
    async addTimer(req, res) {

    }
}

module.exports = new PlanController()