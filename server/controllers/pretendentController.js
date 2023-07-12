const {Pretendent} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class PretendentController {

    //add message
    async newPretendent(req, res) {
        const {projectId, workerId, receiverId} = req.body
        try {
            await Pretendent.create({projectId, workerId, receiverId})
            return res.status(200).json("Pretendent has been sent successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get message conversation
    async getPretendent(req, res) {
        const receiverId = req.params.id
        try {           
            const count = await Pretendent.count({
                where: { receiverId },
              });
            console.log(count)

            const spec = await Pretendent.findAll({
                where: {receiverId},
                // Add order conditions here....
                order: [
                    ['id', 'ASC'], //DESC
                ],
            })
            return res.status(200).json(spec);
        } catch (error) {
            return res.status(500).json(error.spec);
        }
    }

}

module.exports = new PretendentController()