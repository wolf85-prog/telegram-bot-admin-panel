const Project = require('../models/Project')
const ApiError = require('../error/ApiError')
const {ProjectNew} = require('../models/models');
const sequelize = require('../db')
const { Op, QueryTypes  } = require('sequelize')

class ProjectController {

    async getProjects(req, res) {
        try {
            const projects = await Project.findAll({
                order: [
                    ['id', 'DESC'],
                ],
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    

    async getProjectsId(req, res) {
        const {id} = req.params
        try {
            const projects = await Project.findAll({where: {projectId: id}})
            return res.status(200).json(projects);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getProjectNew(req, res) {
        try {
            const daysAgo10 = new Date(new Date().setDate(new Date().getDate() - 10));

            const projects = await Project.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                where: {
                    datestart: {
                        [Op.gte]: daysAgo10
                    }
                }
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    async getProjectsAll(req, res) {
        try {
            const projects = await ProjectNew.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                where: {
                    deleted: null,
                }
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectsDelete(req, res) {
        try {
            const projects = await ProjectNew.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                where: {
                    deleted: true,
                }
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectNewId(req, res) {
        const {id} = req.params
        try {
            const projects = await ProjectNew.findOne({
                where: {id},
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectNewChatId(req, res) {
        const {id} = req.params
        try {
            const projects = await ProjectNew.findAll({
                where: {chatId: id},
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectNewCrmId(req, res) {
        const {id} = req.params
        try {
            const project = await ProjectNew.findOne({
                where: {crmID: id},
            })
            return res.status(200).json(project);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }



    async getProjectNewCreate(req, res) {
        const {name, status, start, specifika, city, datestart, dateend, teh, 
            managerId, companyId, chatId, spec, geo, comment, equipment, index, number, webforma} = req.body

        try {
            // const generate = await sequelize.query('SELECT generate_series(1000,10000,1)', {
            //     // тип запроса - выборка
            //     type: QueryTypes.SELECT,
            //   })

            //   const generateId = generate[index].generate_series

            const crm = await sequelize.query("SELECT nextval('crm_id')");

            const resid = crm[0][0].nextval
            
              const obj = {                
                crmID: resid.toString(),
                name,
                status,
                start,
                specifika,
                city,
                dateStart: datestart, 
                dateEnd: dateend, 
                teh,
                geo,
                managerId,
                companyId,
                chatId,
                spec,  
                comment,
                equipment,
                number,
                webforma,
            }

            const project = await ProjectNew.create(obj)
            return res.status(200).json(project);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectNewUpdate(req, res) {
        const {id} = req.params 
        const {name, status, start, datestart, dateend, teh, geo, managerId, managerId2, companyId, 
            comment, specifika, city, teh1, teh2, teh3, teh4, teh5, teh6, teh7, teh8, deleted} = req.body

        try {
            let exist=await ProjectNew.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "project not exist"});
                return;
            }

            const projects = await ProjectNew.update(
                {
                    name: name,
                    status: status,
                    start,
                    specifika,
                    city,
                    dateStart: datestart, 
                    dateEnd: dateend, 
                    teh,
                    teh1,
                    teh2,
                    teh3,
                    teh4,
                    teh5,
                    teh6,
                    teh7,
                    teh8,
                    geo,
                    managerId,
                    managerId2,
                    companyId,
                    comment,
                    //chatId,
                    //spec,  
                    //equipment,
                    // number,
                    deleted,
                },
                {
                    where: {id: id}
                }
            )
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectNewDel(req, res) {
        const {id} = req.params
        try {
            const projects = await ProjectNew.destroy({
                where: {
                    id: id,
                }
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new ProjectController()