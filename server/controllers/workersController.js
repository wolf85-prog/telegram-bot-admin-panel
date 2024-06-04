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
            console.log(count)

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
                workersProf.map((worker)=>{
                    const workerApp = workers.find((item)=> item.chatId === worker.tgId?.toString())
                    //console.log("workerApp: ", workerApp)
                    const avatar = worker.profile ? (worker.profile?.file ? worker.profile?.file.url : worker.profile?.external.url) : null
                    //console.log("avatar: ", avatar)
                    
                    if (workerApp) {
                        updateAvatar(avatar, workerApp.dataValues)
                    } else {
                        console.log("Специалист не найден!")  
                    }         
                })

                //обновить данные
                console.log("ОБНОВЛЕНИЕ ДАННЫХ СПЕЦИАЛИСТОВ")
                workers.map(async(worker, i)=> {
                    let specArr = []
                    setTimeout(async()=> {             
                        //if (workersN && workersN.length > 0) {

                            //список специалистов
                            workersN[0].spec.map((item) => {
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
                                if (worker.chatId === '1408579113' || worker.chatId === '805436270' || worker.chatId === '639113098' || worker.chatId === '1300119841' || worker.chatId === '276285228') {
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
                                if (worker.chatId === '1408579113' || worker.chatId === '805436270' || worker.chatId === '639113098' || worker.chatId === '1300119841' || worker.chatId === '276285228') {
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
                                console.log("Список специальностей (нет) обновлен! ", worker.chatId, i) 
                            }
                                
                            console.log("ФИО: ", worker.id, workersN[0]?.fio, i)
                            

                            //обновить фио
                            const res = await Worker.update({ 
                                userfamily: workersN[0]?.fio.split(" ")[0],
                                username: workersN[0]?.fio.split(" ")[1],
                                phone: workersN[0]?.phone && workersN[0]?.phone,
                                dateborn: workersN[0].age?.start.split('-')[0],
                                city: workersN[0].city && workersN[0].city,                    
                                from: 'Notion',
                                comment: workersN[0]?.comment ? workersN[0]?.comment : '',
                                rank: workersN[0]?.rank ? workersN[0]?.rank : null,
                            },
                            { 
                                where: {chatId: worker.chatId} 
                            })
                            if (res) {
                            console.log("Специалист обновлен! ", worker.chatId, i) 
                            }else {
                                console.log("Ошибка обновления! ", worker.chatId, i) 
                            }
                            
                        // } else {
                        //     console.log("Специалист не найден в Notion!", worker.chatId, i) 
                        // }     
                        

                        if (i === (workers.length-1)) {
                            socket.emit("sendNotif", {
                                task: 300,
                                workers_update: Math.round((i+1)*100/workers.length),
                                processUpdateD: false,
                            })  
                        } else {
                            socket.emit("sendNotif", {
                                task: 300,
                                workers_update: Math.round((i+1)*100/workers.length),
                                processUpdateD: true,
                            })  
                        }
                    //}

                    }, 500 * ++i)   
                })              
            } else {
                console.log("Ошибка получения данных из таблицы 'Специалисты' Notion!") 
            }         

            // // 1
            // console.log("START UPDATE WORKERS")
            
            // //while (workersN.more)
            // workersN.workers.map(async(worker, i) => {        
            //     setTimeout(async()=> {  

            //         //получить данные специалиста по его id  
            //         const workerApp = workers.find((item)=> item.chatId === worker.tgId?.toString())
            //         console.log(workerApp.dataValues.id)

            //         if (workerApp.dataValues.id) {
            //             const profile = worker.profile
            //             console.log("profile: ", profile)

            //             //обновить аватар
            //             updateAvatar(profile, workerApp.dataValues)
            //         }             

            //         if (i === 99) {
            //             //получить следующие 100 специалистов из ноушен
            //             const workers1 = await getWorkersNotion100(workersN.cursor)
            //             console.log("Получил следующие 100")

            //             workers1.workers.map(async(worker, j) => {
            //                 if (j === 99 && workers1.more) {
            //                     const workers2 = await getWorkersNotion100(workers1.cursor)
            //                     console.log("Получил 200")
            //                 }
            //             })
            //         }
            //     }, 6000 * ++i)
            // })

        } catch (error) {
            console.log(new Date().toLocaleDateString())
            console.log(error.message)
        }
    }




}

module.exports = new WorkersController()