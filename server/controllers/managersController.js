//const {Manager} = require('../models/models')
const {Manager} = require('../models/renthub')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')

require("dotenv").config();

const {specData} = require('../data/specData');
const host = process.env.HOST

const https = require('https');
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');

//socket.io
const {io} = require("socket.io-client");
const socketUrl = process.env.SOCKET_APP_URL

class ManagersController {

    async getManagers(req, res) {
        try {
            const workers = await Manager.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
                // where: {
                //     chatId: {
                //         [Op.ne]: null
                //     }
                // }
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getManagerCount(req, res) {
        const kol = req.params.count
        const prev = req.params.prev
        try {
            const count = await Manager.count();
            //console.log(count)

            const k = parseInt(kol) + parseInt(prev)

            const managers = await Manager.findAll({
                order: [
                    ['id', 'ASC'], //DESC, ASC
                ],
                offset: count > k ? count - k : 0,
                //limit : 50,
            })
            return res.status(200).json(managers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    async editManager(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Manager.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {
                fio, 
                chatId,
                phone,
                phone2, 
                city,
                sfera,
                dolgnost, 
                company,
                comteg,
                comment,
                profile,
                email,
                block,
            } = req.body

            const newUser = await Manager.update(
                { 
                    fio, 
                    chatId,
                    phone, 
                    phone2, 
                    city,
                    sfera,
                    dolgnost,
                    companyId: company,
                    comteg,
                    comment,
                    profile,
                    email,
                    block: block,
                },
                { where: {id: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getManagerId(req, res) {
        const {id} = req.params
        try {
            const manager = await Manager.findOne({where: {chatId: id.toString()}})
            return res.status(200).json(manager);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async addManager(req, res) {       
        try {    

            const {fio} = req.body

            const newUser = await Manager.create({fio})
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deleteManager(req, res) {      
        const {id} = req.params 
        try {              
            await Manager.destroy({
                where: { id: String(id) },
            })
            return res.status(200).json("Данные успешно удалены!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getManagerCountAll(req, res) {
        try {
            const count = await Manager.count();

            return res.status(200).json(count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = new ManagersController()