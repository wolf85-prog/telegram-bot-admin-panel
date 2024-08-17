const {Manager} = require('../models/renthub')
const ApiError = require('../error/ApiError')

require("dotenv").config();

//const { Client } = require("@notionhq/client");
//const notion = new Client({ auth: process.env.NOTION_API_KEY });
//const databaseWorkerId = process.env.NOTION_DATABASE_WORKERS_ID

const {specData} = require('../data/specData');

const host = process.env.HOST

const https = require('https');
const fs = require('fs');
const path = require('path')
//const sharp = require('sharp');

//socket.io
const {io} = require("socket.io-client");
const socketUrl = process.env.SOCKET_APP_URL

class RmanagersController {

    async getRmanagers(req, res) {
        try {
            const managers = await Manager.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
            })
            return res.status(200).json(managers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getRManagerCount(req, res) {
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

    async getRmanager(req, res) {
        const {id} = req.params
        try {
            const managers = await Manager.findOne({where: {chatId: id}})
            return res.status(200).json(managers);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async editRmanager(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Manager.findOne( {where: {chatId: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {username} = req.body

            const newUser = await Manager.update(
                { username },
                { where: {chatId: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    // async blockWorker(req, res) { 
    //     const {id} = req.params      
    //     try {    
    //         let exist=await Worker.findOne( {where: {chatId: id}} )
            
    //         if(!exist){
    //             res.status(500).json({msg: "user not exist"});
    //             return;
    //         }

    //         const newUser = await Worker.update(
    //             { block: exist.dataValues.block !==null ? !exist.dataValues.block : true},
    //             { where: {chatId: id} })
    //         return res.status(200).json(newUser);
    //     } catch (error) {
    //         return res.status(500).json(error.message);
    //     }
    // }


}

module.exports = new RmanagersController()