const {Platform} = require('../models/models')
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

class PlatformsController {

    async getPlatforms(req, res) {
        try {
            const company = await Platform.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
            })
            return res.status(200).json(company);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getPlatformCount(req, res) {
        const kol = req.params.count
        const prev = req.params.prev
        try {
            const count = await Platform.count();
            //console.log(count)

            const k = parseInt(kol) + parseInt(prev)

            const managers = await Platform.findAll({
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


    async editPlatform(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Platform.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {
                title, 
                city,
                address,
                track,
                url,
                comment,
            } = req.body

            const newUser = await Platform.update(
                { 
                    title, 
                    city,
                    address,
                    track,
                    url,
                    comment,   
                },
                { where: {id: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getPlatformId(req, res) {
        const {id} = req.params
        try {
            const manager = await Platform.findOne({where: {id: String(id)}})
            return res.status(200).json(manager);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async addPlatform(req, res) {       
        try {    

            const {title} = req.body

            const newUser = await Platform.create({title})
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deletePlatform(req, res) {      
        const {id} = req.params 
        try {              
            await Platform.destroy({
                where: { id: String(id) },
            })
            return res.status(200).json("Данные успешно удалены!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getPlatformCountAll(req, res) {
        try {
            const count = await Platform.count();

            return res.status(200).json(count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = new PlatformsController()