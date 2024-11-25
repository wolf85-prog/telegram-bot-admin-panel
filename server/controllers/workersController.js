const {Worker, Canceled} = require('../models/workers')
const ApiError = require('../error/ApiError')

require("dotenv").config();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseWorkerId = process.env.NOTION_DATABASE_WORKERS_ID

const {specData} = require('./../data/specData');
const getWorkersNotion = require('../common/getWorkersNotion');
const getWorkersNotion100 = require('../common/getWorkersNotion100');
const getWorkersNotion100s = require('../common/getWorkersNotion100s');
const updateAvatar = require('../common/updateAvatar');
const host = process.env.HOST

const https = require('https');
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');

//socket.io
const {io} = require("socket.io-client");
const socketUrl = process.env.SOCKET_APP_URL

class WorkersController {

    async getWorkers(req, res) {
        try {
            const workers = await Worker.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getWorkersCount(req, res) {
        const kol = req.params.count
        const prev = req.params.prev
        try {
            const count = await Worker.count();
            //console.log(count)

            const k = parseInt(kol) + parseInt(prev)

            const workers = await Worker.findAll({
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
            const workers = await Worker.findOne({where: {chatId: id}})
            return res.status(200).json(workers);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async editWorker(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Worker.findOne( {where: {chatId: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {username} = req.body

            const newUser = await Worker.update(
                { username },
                { where: {chatId: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async blockWorker(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Worker.findOne( {where: {chatId: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }



            const newUser = await Worker.update(
                { block: exist.dataValues.block !==null ? !exist.dataValues.block : true},
                { where: {chatId: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getCanceled(req, res) {
        try {
            const workers = await Canceled.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getCanceled(req, res) {
        try {
            const workers = await Canceled.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getCanceledId(req, res) {
        const {projectId, workerId, receiverId} = req.body
        try {
            const workers = await Canceled.findOne({
                where: {projectId, workerId, receiverId, cancel: true },
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async addCanceled(req, res) {
        const {projectId, workerId, receiverId, blockId, cancel} = req.body
        try {
            let exist=await Canceled.findOne( {where: {projectId, workerId, receiverId, cancel: true}} )
            
            if(exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }
            const newUser = await Canceled.create({projectId, workerId, receiverId, blockId, cancel})
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    // Define a sleep function that returns a promise
//------------------------------------------------------------
//        обновление аватарок
//------------------------------------------------------------
    async updateWorkers(req, res) {
        console.log("Start update")

        // Подключаемся к серверу socket
        let socket = io(socketUrl);

        socket.emit("sendNotif", {
            task: 300,
            workers_update: 0,
            processUpdateD: true,
        }) 

        try {
            console.log("START GET WORKERS ALL...")

            const workers = await Worker.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
            })
            console.log("workers: ", workers.length)  

            //получить всех специалистов из ноушен
            const workersN = await getWorkersNotion()
            console.log("workersN: ", workersN.length)  

            //if (Object.keys(workersN).length !== 0) {
            if (workersN && workersN.length > 0) {
                const workersProf = workersN.filter((item)=> item.profile && item.profile !== null)
                console.log("workersProf: ", workersProf.length) 

                //обновить аватар
                let j = 0
                let proc = 0
                //while (j < workersProf.length) { 
                workersProf.map(async(worker, index)=>{
                    setTimeout(()=> {
                        const workerApp = workers.find((item)=> item.chatId === worker.tgId?.toString())
                        const avatar = worker.profile.files.length > 0 ? (worker.profile?.files[0].file ? worker.profile?.files[0].file.url : worker.profile?.files[0].external.url) : null
                        //const avatar = notion[0].profile.files.length > 0 ? notion[0].profile.files[0].file.url : ''
                        if (workerApp) {
                            updateAvatar(avatar, workerApp.dataValues)
                            //console.log("Специалист найден!", index)  
                        } else {
                            console.log("Внимание! Специалист не найден!", index)  
                        }

                        proc = Math.round((index+1)*100/workersProf.length)

                        if (index === (workersProf.length)) {
                            console.log("Обновление данных завершено: i=", index, proc)
                            socket.emit("sendNotif", {
                                task: 300,
                                workers_update: proc,
                                processUpdateD: false,
                            })  
                            socket.disconnect()
                            
                        } else {
                            console.log("Идет обновление аватарок...: i=", index, proc)                      
                            if (index % 20 === 0) {
                                socket.emit("sendNotif", {
                                    task: 300,
                                    workers_update: proc,
                                    processUpdateD: true,
                                })  
                            }
                        }
                    }, 1500 * ++index)   
                })

                //обновить данные
                console.log("ОБНОВЛЕНИЕ ДАННЫХ СПЕЦИАЛИСТОВ")
                
                workers.map(async(worker, i)=> {
                    let specArr = []
                    setTimeout(async()=> {     
                        const workerN = workersN.filter((item)=> item.tgId?.toString() === worker.chatId)        
                        
                        if (workerN && workerN.length > 0) {
                            console.log("Обновление данных...", i, Math.round((i+1)*100/workers.length))
                            //список специалистов
                            workerN[0].spec.map((item) => {
                                specData.map((category)=> {
                                    category.models.map((work)=> {
                                        if (work.name === item.name){
                                            const obj = {
                                                spec: item.name,
                                                cat: category.icon,
                                            }
                                            specArr.push(obj)
                                        }
                                    })
                                    if (category.icon === item.name) {
                                        const obj = {
                                            spec: item.name,
                                            cat: category.icon,
                                        }
                                        specArr.push(obj) 
                                    }
                                })
                                if (item.name === 'Blacklist') {
                                    const obj = {
                                        spec: item.name,
                                        cat: 'Blacklist',
                                    }
                                    specArr.push(obj) 
                                }
                                if (item.name === '+18') {
                                    const obj = {
                                        spec: item.name,
                                        cat: '+18',
                                    }
                                    specArr.push(obj) 
                                }
                            })
        
                            if (specArr.length > 0) {
                                //обновить бд
                                if (worker.chatId === '1408579113' || worker.chatId === '805436270' || worker.chatId === '639113098' || worker.chatId === '671797459' || worker.chatId === '276285228' || worker.chatId === '1144954767') {
                                    const newSpec = {
                                        spec: 'Вне категории',
                                        cat: 'NoTag'
                                    }
                                    const newSpec2 = {
                                        spec: 'Тест',
                                        cat: 'Test'
                                    }
                                    specArr.push(newSpec)
                                    specArr.push(newSpec2)

                                    const res = await Worker.update({ 
                                        worklist: JSON.stringify(specArr)  
                                    },
                                    { 
                                        where: {chatId: worker.chatId} 
                                    })
                                } else {             
                                    const res = await Worker.update({ 
                                        worklist: JSON.stringify(specArr)  
                                    },
                                    { 
                                        where: {chatId: worker.chatId} 
                                    })
                                }   
                                console.log("Список специальностей (есть) обновлен! ", worker.chatId, i)                                        
                            } else {
                                //обновить бд
                                if (worker.chatId === '1408579113' || worker.chatId === '805436270' || worker.chatId === '639113098' || worker.chatId === '671797459' || worker.chatId === '276285228') {
                                    const newSpec = {
                                        spec: 'Вне категории',
                                        cat: 'NoTag'
                                    }
                                    const newSpec2 = {
                                        spec: 'Тест',
                                        cat: 'Test'
                                    }
                                    specArr.push(newSpec)
                                    specArr.push(newSpec2)

                                    const res = await Worker.update({ 
                                        worklist: JSON.stringify(specArr)  
                                    },
                                    { 
                                        where: {chatId: worker.chatId} 
                                    })
                                } else {
                                    const res = await Worker.update({ 
                                        worklist: JSON.stringify([{
                                            spec: 'Вне категории',
                                            cat: 'NoTag'
                                        }]) 
                                    },
                                    { 
                                        where: {chatId: worker.chatId} 
                                    })
                                }
                                //console.log("Список специальностей (нет) обновлен! ", worker.chatId, i) 
                            }
                                
                            console.log("ФИО: ", worker.id, workerN[0]?.fio, i)
                            

                            //обновить фио
                            const res = await Worker.update({ 
                                userfamily: workerN[0]?.fio.split(" ")[0],
                                username: workerN[0]?.fio.split(" ")[1],
                                phone: workerN[0]?.phone && workerN[0]?.phone,
                                dateborn: workerN[0].age?.start.split('-')[0],
                                city: workerN[0].city && workerN[0].city,     
                                newcity: workerN[0].newcity.length > 0 ? workerN[0].newcity[0].name : '',                
                                from: 'Notion',
                                comment: workerN[0]?.comment ? workerN[0]?.comment : '',
                                rank: workerN[0]?.rank ? workerN[0]?.rank : null,
                            },
                            { 
                                where: {chatId: worker.chatId} 
                            })
                            // if (res) {
                            //     console.log("Специалист обновлен! ", worker.chatId, i) 
                            // }else {
                            //     console.log("Ошибка обновления! ", worker.chatId, i) 
                            // }
                            
                        } else {
                            console.log("Внимание! Специалист не найден в Notion!", worker.chatId, i) 
                        }     
                        
                        
                    //}

                    }, 500 * ++i)   
                })              
            } else {
                console.log("Ошибка получения данных из таблицы 'Специалисты' Notion!") 
            }         

        } catch (error) {
            console.log(new Date().toLocaleDateString())
            console.log(error.message)
        }
    }

}

module.exports = new WorkersController()