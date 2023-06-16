const {Worker} = require('../models/workers')
const ApiError = require('../error/ApiError')

class WorkersController {

    async getWorkers(req, res) {
        try {
            const workers = await Worker.findAll({
                order: [
                    ['id', 'DESC'],
                ],
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getWorker(req, res) {
        const {id} = req.params
        try {
            const workers = await Worker.findOne({where: {chatId: id}})
            return res.status(200).json(workers);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async editWorker(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Worker.findOne( {where: {chatId: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {username} = req.body

            const newUser = await Worker.update(
                { username },
                { where: {chatId: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new WorkersController()