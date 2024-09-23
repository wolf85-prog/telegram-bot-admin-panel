const {Worker, Specialist} = require('../models/models')
const ApiError = require('../error/ApiError')

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

class SpecialistController {

    async getSpecialist(req, res) {
        try {
            const workers = await Specialist.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
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

    async getWorker(req, res) {
        const {id} = req.params
        try {
            const workers = await Specialist.findOne({where: {chatId: id}})
            return res.status(200).json(workers);
        } catch (err) {
            return res.status(500).json(err);
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
                phone, 
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
                chatId,
                profile,
                inn,
                email,
                promo,
                passport
            } = req.body

            const newUser = await Specialist.update(
                { 
                    fio, 
                    phone, 
                    city,
                    age,
                    specialization: speclist,
                    company,
                    skill,
                    merch,
                    comteg,
                    comteg2,
                    comment,
                    comment2,
                    chatId,
                    profile,
                    inn,
                    email,
                    promoId: promo,
                    passport,
                    block,
                    block18
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
            const worker = await Specialist.findOne({where: {chatId: id.toString()}})
            return res.status(200).json(worker);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async addSpecialist(req, res) {       
        try {    

            const {fio} = req.body

            const newUser = await Specialist.create({fio})
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

}

module.exports = new SpecialistController()