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
                order: [
                    ['id', 'DESC'],
                ],
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }



    async getProjectNewCreate(req, res) {
        const {name, datestart, dateend, teh, 
            managerId, companyId, chatId, spec, geo, equipment} = req.body

        
        
        try {

            const generateId = await sequelize.query('SELECT generate_series(1000,10000,1)', {
                // тип запроса - выборка
                type: QueryTypes.SELECT,
              })
            console.log("generateId: ", generateId)
            // const project = await ProjectNew.create({ 
            //     name, 
            //     crmId: generateId,
            //     dateStart: datestart, 
            //     dateEnd: dateend, 
            //     teh,
            //     managerId,
            //     companyId,
            //     chatId,
            //     spec,
            //     geo,
            //     equipment,
            // })
            return generateId;
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectNewUpdate(req, res) {
        const {id, name} = req.body
        try {
            const projects = await ProjectNew.update(
                {
                    name: name
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
        const {id} = req.body
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