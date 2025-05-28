const {Worker, Specialist} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')

require("dotenv").config();

const {specData} = require('../data/specData');
const host = process.env.HOST

const https = require('https');
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');
const tryParseInt = require('../utils/parser');

//socket.io
const {io} = require("socket.io-client");
const socketUrl = process.env.SOCKET_APP_URL

class SpecialistController {

    async getPaginatedSpecialist (req, res) {        
        const page = tryParseInt(req.query.page, 0);
        const limit = tryParseInt(req.query.limit, 10);
      
        try {
          const { count, rows } = await Specialist.findAndCountAll({
            order: [["id", "DESC"]],           
            offset: limit * page,
            limit: limit,
            
          });
      
          res.status(200).json({
            page: page,
            limit: limit,
            total: count,
            data: rows,
        });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };

      async searchSpecialists(req, res) {
        const {q} = req.query
        
        try {
            const worker = await Specialist.findAll({where: {fio: {[Op.iLike]: `%${q}%`}}})
            return res.status(200).json(worker);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getSpecialist(req, res) {        
        try {
            const workers = await Specialist.findAll({
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

    async getSpecialistFilter(req, res) {        
        try {
            const workers = await Specialist.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
                attributes: [['id', 'value'],  ['fio', 'label'] ],
                
            })
            
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getSpecCount(req, res) {        
        const kol = req.params.count
        const prev = req.params.prev
        try {
            const count = await Specialist.count();
            //console.log(count)

            const k = parseInt(kol) + parseInt(prev)

            const workers = await Specialist.findAll({
                order: [
                    ['id', 'ASC'], //DESC, ASC
                ],
                offset: count > k ? count - k : 0,
                //limit : 50,
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async editSpecialist(req, res) {         
        const {id} = req.params      
        try {    
            let exist=await Specialist.findOne( {where: {id: id}} )
            
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
                blockW,
                block18,
                krest,
                passeria,
                pasnumber,
                paskemvidan,
                pasdatevidan,
                pascode,
                pasbornplace,
                pasaddress,
                surname,
                name,
                secondname,
            } = req.body

            const newUser = await Specialist.update(
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
                    blockW,
                    block18,
                    krest,
                    passeria,
                    pasnumber,
                    paskemvidan,
                    pasdatevidan,
                    pascode,
                    pasbornplace,
                    pasaddress,
                    surname,
                    name,
                    secondname,
                },
                { where: {id: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getSpecialistId(req, res) {        
        const {id} = req.params
        try {
            const worker = await Specialist.findOne({where: {id: id.toString()}})
            return res.status(200).json(worker);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getSpecialistChatId(req, res) {        
        const {id} = req.params
        try {
            const workers = await Specialist.findOne({where: {chatId: id.toString()}})
            return res.status(200).json(workers);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async addSpecialist(req, res) {       
        try {    

            const {fio} = req.body
            
            const currentMonth = new Date().getMonth() + 1
            let urlAvatar = ''
            
            if (currentMonth === 1) {
                //апрель
                urlAvatar = 'https://proj.uley.team/upload/01_2025.jpg'
            } 
            else if (currentMonth === 2) {
                //май
                urlAvatar = 'https://proj.uley.team/upload/02_2025.jpg'
            } 
            else if (currentMonth === 3) {
                //май
                urlAvatar = 'https://proj.uley.team/upload/03_2025.jpg'
            } 
            else if (currentMonth === 4) {
                //май
                urlAvatar = 'https://proj.uley.team/upload/04_2025.jpg'
            } 
            else if (currentMonth === 5) {
                //май
                urlAvatar = 'https://proj.uley.team/upload/05_2025.jpg'
            } 
            else if (currentMonth === 6) {
                //июнь
                urlAvatar = 'https://proj.uley.team/upload/06_2025.jpg'
            }
            else if (currentMonth === 7) {
                //июль
                urlAvatar = 'https://proj.uley.team/upload/07_2025.jpg'
            }
            else if (currentMonth === 8) {
                //август
                urlAvatar = 'https://proj.uley.team/upload/08_2025.jpg'
            }
            else if (currentMonth === 9) {
                //сентябрь
                urlAvatar = 'https://proj.uley.team/upload/09_2025.jpg'
            }
            else if (currentMonth === 10) {
                //октябрь
                urlAvatar = 'https://proj.uley.team/upload/10_2025.jpg'
            }
            else if (currentMonth === 11) {
                //ноябрь
                urlAvatar = 'https://proj.uley.team/upload/11_2025.jpg'
            }
            else if (currentMonth === 12) {
                //декабрь
                urlAvatar = 'https://proj.uley.team/upload/12_2025.jpg'
            }

            const newUser = await Specialist.create({fio, profile: urlAvatar})
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deleteSpecialist(req, res) {      
        const {id} = req.params 
        try {              
            await Specialist.destroy({
                where: { id: String(id) },
            })
            return res.status(200).json("Данные успешно удалены!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getSpecCountAll(req, res) {
        console.log(req)
        try {
            const count = await Specialist.count();

            return res.status(200).json(count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getSpecialistPhone(req, res) {        
        const {id} = req.params
        try {
            const worker = await Specialist.findOne({where: {
                [Op.or]: [{phone: id.toString()}, {phone2: id.toString()}]
            }})
            return res.status(200).json(worker);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async blockSpecialist(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Specialist.findOne( {where: {chatId: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const newUser = await Specialist.update(
                { blockW: exist.dataValues.blockW !==null ? !exist.dataValues.blockW : true},
                { where: {chatId: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = new SpecialistController()