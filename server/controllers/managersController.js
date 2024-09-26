const {Manager} = require('../models/models')
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
                where: {
                    chatId: {
                        [Op.ne]: null
                    }
                }
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
                age, 
                speclist,
                company,
                skill,
                merch,
                comteg,
                comteg2,
                comment,
                comment2,
                profile,
                inn,
                email,
                promo,
                passport,
                block,
                block18
            } = req.body

            const newUser = await Manager.update(
                { 
                    fio, 
                    chatId,
                    phone, 
                    phone2, 
                    specialization: speclist,
                    city,
                    skill,
                    promoId: promo,
                    merch,
                    company,
                    comteg,
                    comteg2,
                    comment,
                    comment2,
                    age,
                    inn,
                    passport,
                    profile,
                    email,
                    blockW: block,
                    block18
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
            
            const currentMonth = new Date().getMonth() + 1
            let urlAvatar = ''
            
            if (currentMonth === 4) {
                //апрель
                urlAvatar = 'https://proj.uley.team/upload/2024-04-23T08:08:31.547Z.jpg'
            } 
            else if (currentMonth === 5) {
                //май
                urlAvatar = 'https://proj.uley.team/upload/2024-05-02T06:01:44.244Z.jpg'
            } 
            else if (currentMonth === 6) {
                //июнь
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:51:23.345Z.jpg'
            }
            else if (currentMonth === 7) {
                //июль
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:52:17.472Z.jpg'
            }
            else if (currentMonth === 8) {
                //август
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:53:06.699Z.jpg'
            }
            else if (currentMonth === 9) {
                //сентябрь
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:54:00.494Z.jpg'
            }
            else if (currentMonth === 10) {
                //октябрь
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:54:13.965Z.jpg'
            }
            else if (currentMonth === 11) {
                //ноябрь
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:54:28.857Z.jpg'
            }
            else if (currentMonth === 12) {
                //декабрь
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:54:44.499Z.jpg'
            } 

            const newUser = await Manager.create({fio, profile: urlAvatar})
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