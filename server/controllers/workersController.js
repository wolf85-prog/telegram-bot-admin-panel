const {Worker, Canceled} = require('../models/workers')
const ApiError = require('../error/ApiError')

require("dotenv").config();

const {specData} = require('./../data/specData');
const getWorkersNotion = require('../common/getWorkersNotion');
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

            if (Object.keys(workersN).length !== 0) {
               console.log("workersN: ", workersN.length) 
            } else {
                console.log("Ошибка получения данных из таблицы 'Специалисты' Notion!") 
            }         

            // 1
            console.log("START UPDATE WORKERS")
            workers.map(async(worker, i)=> {
                let specArr = []
                setTimeout(async()=> {  
                    //получить данные специалиста по его id
                    const workerN = workersN.find((item)=> item.tgId === worker.chatId)
                    console.log("workerN: ", workerN)
            
                    if (workerN) {
                       //console.log("worker: ", workersN)
                        //список специалистов
                        workerN.spec.map((item) => {
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
                            
                        console.log("ФИО: ", worker.id, workerN?.fio, i)
                           

                        //обновить фио
                        const res = await Worker.update({ 
                            userfamily: workerN?.fio.split(" ")[0],
                            username: workerN?.fio.split(" ")[1],
                            phone: workerN?.phone && workerN?.phone,
                            dateborn: workerN.age?.start.split('-')[0],
                            city: workerN.city && workerN.city,                    
                            from: 'Notion',
                            comment: workerN?.comment ? workerN?.comment : '',
                            rank: workerN?.rank ? workerN?.rank : null,
                        },
                        { 
                            where: {chatId: worker.chatId} 
                        })
                        if (res) {
                           console.log("Специалист обновлен! ", worker.chatId, i) 
                        }else {
                            console.log("Ошибка обновления! ", worker.chatId, i) 
                        }
                        
                    } else {
                        console.log("Специалист не найден в Notion!", worker.chatId, i) 
                    }     
                    

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

                }, 500 * ++i)   
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    //UPDATE AVATAR
    async updateWorkersAvatar(req, res) {
        console.log("Start update avatar")

        // Подключаемся к серверу socket
        let socket = io(socketUrl);

        socket.emit("sendNotif", {
            task: 301,
            avatar_update: 0,
            processUpdateA: true,
        }) 

        const directory = "/var/www/proj.uley.team/avatars";
        // //очистить директорию
        // fs.readdir(directory, (err, files) => {
        // if (err) throw err;

        // console.log("Начинаю удаление аватарок...")
        // for (const file of files) {
        //     fs.unlink(path.join(directory, file), (err) => {
        //     if (err) throw err;
        //     });
        // }
        // });


        // try {
        //     console.log("START GET WORKERS ALL...")
        //     const workers = await Worker.findAll({
        //         order: [
        //             ['id', 'DESC'], //DESC, ASC
        //         ],
        //     })
        //     console.log("workers: ", workers.length) 
            
        //     //2
        //     workers.map(async(worker, i)=> {
        //         let specArr = []
        //         setTimeout(async()=> {  
        //             //получить данные специалиста по его id
        //             const response = await notion.databases.query({
        //                 database_id: databaseWorkerId, 
        //                 "filter": {
        //                     "property": "Telegram",
        //                     "number": {
        //                         "equals": worker.chatId ? parseInt(worker.chatId) : 0
        //                     }
        //                 },
        //                 "sorts": [{ 
        //                     "timestamp": "created_time", 
        //                     "direction": "ascending" 
        //                 }]
        //             });

        //             const notionW = response.results.map((page) => {
        //                 return {
        //                     id: page.id,
        //                     fio: page.properties.Name.title[0]?.plain_text,
        //                     tgId: page.properties.Telegram.number,
        //                     phone: page.properties.Phone.phone_number,
        //                     age: page.properties.Age.date,
        //                     city: page.properties.City.rich_text[0]?.plain_text,
        //                     spec: page.properties.Specialization.multi_select,
        //                     comment: page.properties["Комментарии"].rich_text[0]?.plain_text,
        //                     reyting: page.properties["Рейтинг"].rich_text[0]?.plain_text,
        //                     merch: page.properties.Merch.multi_select,
        //                     comteg: page.properties["КомТег"].multi_select,
        //                     rank: page.properties["Ранг"].number,
        //                     passport: page.properties.Passport.rich_text[0]?.plain_text,
        //                 };
        //             });

        //             if (notionW && notionW.length > 0) {                       
        //                 //получить аватарку
        //                 const response = await notion.blocks.children.list({
        //                     block_id: notionW[0]?.id,
        //                 });

        //                 const spec = response.results.map((page) => {
        //                     return {
        //                         id: page.id,
        //                         image: page.image ? (page.image?.file ? page.image?.file.url : page.image.external.url) : null,
        //                     };
        //                 });
        //                 if (spec.length > 0) {
        //                     console.log("avatar: ", spec[0].image, worker.id) 

        //                     const date = new Date()
        //                     const currentDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}T${date.getHours()}:${date.getMinutes()}`

        //                         try {
        //                             //сохранить фото на сервере
        //                             if (spec[0].image) {  
        //                                 //найти старое фото
        //                                 var fileName = worker.chatId; 
        //                                 fs.readdir(directory, function(err,list){
        //                                     if(err) throw err;
        //                                     for(var i=0; i<list.length; i++)
        //                                     {
        //                                         if(list[i].includes(fileName))
        //                                         {
        //                                             //удалить найденный файл (синхронно)
        //                                             fs.unlinkSync(path.join(directory, list[i]), (err) => {
        //                                                 if (err) throw err;
        //                                                 console.log("Файл удален!")
        //                                             });
        //                                         }
        //                                     }
        //                                 });

        //                                 //сохранить новое фото
        //                                 const file = fs.createWriteStream('/var/www/proj.uley.team/avatars/avatar_' + worker.chatId + '_' + currentDate + '.jpg');
                                        
        //                                 const transformer = sharp()
        //                                 .resize(500)
        //                                 .on('info', ({ height }) => {
        //                                     console.log(`Image height is ${height}`);
        //                                 });
                                        
        //                                 const request = https.get(spec[0].image, function(response) {
        //                                     response.pipe(transformer).pipe(file);
                    
        //                                     // after download completed close filestream
        //                                     file.on("finish", async() => {
        //                                         file.close();
        //                                         console.log("Download Completed");

        //                                         const url = `${host}/avatars/avatar_` + worker.chatId + '_' + currentDate + '.jpg'
                    
        //                                         //обновить бд
        //                                         const res = await Worker.update({ 
        //                                             avatar: url,
        //                                         },
        //                                         { 
        //                                             where: {chatId: worker.chatId} 
        //                                         })
                    
        //                                         if (res) {
        //                                             console.log("Специалиста аватар обновлен! ", i, url) 
        //                                         }else {
        //                                             console.log("Ошибка обновления! ", worker.chatId) 
        //                                         }
        //                                     });
        //                                 });
        //                             } else {
        //                                 console.log("Аватар не читается! ", worker.chatId, i) 
        //                             }
        //                         } catch (err) {
        //                             console.error(err);
        //                         }
        //                 } else {
        //                     console.log("Аватар не найден в Notion!", worker.chatId, i) 
        //                 }   
                        
        //             } else {
        //                 console.log("Специалист не найден в Notion!", worker.chatId, i) 
        //             }      
                    

        //             if (i === (workers.length-1)) {
        //                 socket.emit("sendNotif", {
        //                     task: 301,
        //                     avatar_update: Math.round((i+1)*100/workers.length),
        //                     processUpdateA: false,
        //                 })  
        //             } else {
        //                 socket.emit("sendNotif", {
        //                     task: 301,
        //                     avatar_update: Math.round((i+1)*100/workers.length),
        //                     processUpdateA: true,
        //                 })  
        //             }

        //         }, 6000 * ++i) //1206000 * ++i)   
        //     })   
        // } catch (error) {
            
        // }
    }

}

module.exports = new WorkersController()