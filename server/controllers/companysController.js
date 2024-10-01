const {Company} = require('../models/models')
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

class CompanysController {

    async getCompanys(req, res) {
        try {
            const company = await Company.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
            })
            return res.status(200).json(company);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getCompanyCount(req, res) {
        const kol = req.params.count
        const prev = req.params.prev
        try {
            const count = await Company.count();
            //console.log(count)

            const k = parseInt(kol) + parseInt(prev)

            const managers = await Company.findAll({
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


    async editCompany(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Company.findOne( {where: {id: id}} )
            
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

            const newUser = await Company.update(
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

    async getCompanyId(req, res) {
        const {id} = req.params
        try {
            const manager = await Company.findOne({where: {id: String(id)}})
            return res.status(200).json(manager);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async addCompany(req, res) {       
        try {    

            const {title} = req.body

            const newUser = await Company.create({title})
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deleteCompany(req, res) {      
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

    async getCompanyCountAll(req, res) {
        try {
            const count = await Company.count();

            return res.status(200).json(count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = new CompanysController()