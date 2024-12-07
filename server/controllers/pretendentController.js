const {Pretendent} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')

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
                where: { receiverId, accept: true },
              });
            //console.log("Кол-во претендентов: ", count)

            const spec = await Pretendent.findAll({
                where: {receiverId, accept: true },
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
                where: {otclick: {
                    [Op.not]: null
                }},
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

    //get All Count
    async getAllPretendentCount(req, res) {

        const kol = req.params.count
        const prev = req.params.prev
        try {
            const count = await Pretendent.count();
            //console.log(count)

            const k = parseInt(kol) + parseInt(prev)

            const spec = await Pretendent.findAll({
                where: {otclick: {
                    [Op.not]: null
                }},
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
                //offset: count > k ? count - k : 0,
                limit : k,
            })
            return res.status(200).json(spec);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    //get message conversation
    async getPretendentProjectId(req, res) {
        const projectId = req.params.id
        try {           
            const count = await Pretendent.count({
                where: { projectId, accept: true },
              });
            //console.log("Кол-во претендентов: ", count)

            const spec = await Pretendent.findAll({
                where: {projectId, accept: true },
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

    async editPretendent(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Pretendent.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {
                status,
            } = req.body

            const newUser = await Pretendent.update(
                { 
                    status,
                },
                { where: {id: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = new PretendentController()