const {Pretendent} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class PretendentController {

    //add message
    async newPretendent(req, res) {
        const {projectId, workerId, receiverId, accept} = req.body
        try {
            const newUser = await Pretendent.create({projectId, workerId, receiverId, accept})
            //return res.status(200).json("Pretendent has been sent successfully");
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get message conversation
    async getPretendentId(req, res) {
        const receiverId = req.params.id
        try {           
            const count = await Pretendent.count({
                where: { receiverId, accept: false },
              });
            //console.log("Кол-во претендентов: ", count)

            const spec = await Pretendent.findAll({
                where: {receiverId, accept: false },
                // Add order conditions here....
                order: [
                    ['updatedAt', 'ASC'], //DESC
                ],
            })
            return res.status(200).json(spec);
        } catch (error) {
            return res.status(500).json(error.spec);
        }
    }


    //get 
    async getPretendent(req, res) {
        const {projectId, receiverId} = req.body
        try {           
            const count = await Pretendent.count({
                where: { receiverId, projectId },
              });
            //console.log(count)

            const spec = await Pretendent.findOne({
                where: {receiverId, projectId},
            })
            return res.status(200).json(spec);
        } catch (error) {
            return res.status(500).json(error.spec);
        }
    }

    //get All
    async getAllPretendent(req, res) {
        try {           
            const count = await Pretendent.count();
            //console.log(count)

            const spec = await Pretendent.findAll({
                where: {otclick: !null},
                // Add order conditions here....
                order: [
                    ['id', 'DESC'], //DESC
                ],
            })
            return res.status(200).json(spec);
        } catch (error) {
            return res.status(500).json(error.spec);
        }
    }

}

module.exports = new PretendentController()