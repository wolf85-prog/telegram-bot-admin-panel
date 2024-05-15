const {Worker, Canceled} = require('../models/workers')
const ApiError = require('../error/ApiError')

require("dotenv").config();
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseWorkerId = process.env.NOTION_DATABASE_WORKERS_ID

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

        try {
            console.log("START GET WORKERS ALL...")
            //const workers = await getWorkersAll()
            const workers = await Worker.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
            })
            console.log("workers: ", workers.length)  

            // 1
            console.log("START UPDATE WORKERS")
            workers.map(async(worker, i)=> {
                let specArr = []
                setTimeout(async()=> {  
                    //получить данные специалиста по его id
                    //const notion = await getWorkerNotion(worker.chatId)
                    const response = await notion.databases.query({
                        database_id: databaseWorkerId, 
                        "filter": {
                            "property": "Telegram",
                            "number": {
                                "equals": worker.chatId ? parseInt(worker.chatId) : 0
                            }
                        },
                        "sorts": [{ 
                            "timestamp": "created_time", 
                            "direction": "ascending" 
                        }]
                    });
            
                    const notion = response.results.map((page) => {
                        return {
                            id: page.id,
                            fio: page.properties.Name.title[0]?.plain_text,
                            tgId: page.properties.Telegram.number,
                            phone: page.properties.Phone.phone_number,
                            age: page.properties.Age.date,
                            city: page.properties.City.rich_text[0]?.plain_text,
                            spec: page.properties.Specialization.multi_select,
                            comment: page.properties["Комментарии"].rich_text[0]?.plain_text,
                            reyting: page.properties["Рейтинг"].rich_text[0]?.plain_text,
                            merch: page.properties.Merch.multi_select,
                            comteg: page.properties["КомТег"].multi_select,
                            rank: page.properties["Ранг"].number,
                            passport: page.properties.Passport.rich_text[0]?.plain_text,
                        };
                    });
                    console.log(notion)

                    //if (notion && notion.length > 0) {
                    //    console.log("worker: ", notion)
                    //     //список специалистов
                    //     notion[0].spec.map((item) => {
                    //         specData.map((category)=> {
                    //             category.models.map((work)=> {
                    //                 if (work.name === item.name){
                    //                     const obj = {
                    //                         spec: item.name,
                    //                         cat: category.icon,
                    //                     }
                    //                     specArr.push(obj)
                    //                 }
                    //             })
                    //             if (category.icon === item.name) {
                    //                 const obj = {
                    //                     spec: item.name,
                    //                     cat: category.icon,
                    //                 }
                    //                 specArr.push(obj) 
                    //             }
                    //         })
                    //         if (item.name === 'Blacklist') {
                    //             const obj = {
                    //                 spec: item.name,
                    //                 cat: 'Blacklist',
                    //             }
                    //             specArr.push(obj) 
                    //         }
                    //     })
    
                    //     if (specArr.length > 0) {
                    //         //обновить бд
                    //         if (worker.chatId === '1408579113' || worker.chatId === '805436270' || worker.chatId === '639113098' || worker.chatId === '1300119841' || worker.chatId === '276285228') {
                    //             newSpec = {
                    //                 spec: 'Вне категории',
                    //                 cat: 'NoTag'
                    //             }
                    //             newSpec2 = {
                    //                 spec: 'Тест',
                    //                 cat: 'Test'
                    //             }
                    //             specArr.push(newSpec)
                    //             specArr.push(newSpec2)

                    //             const res = await Worker.update({ 
                    //                 worklist: JSON.stringify(specArr)  
                    //             },
                    //             { 
                    //                 where: {chatId: worker.chatId} 
                    //             })
                    //         } else {             
                    //             const res = await Worker.update({ 
                    //                 worklist: JSON.stringify(specArr)  
                    //             },
                    //             { 
                    //                 where: {chatId: worker.chatId} 
                    //             })
                    //         }   
                    //         console.log("Список специальностей (есть) обновлен! ", worker.chatId, i)                                        
                    //     } else {
                    //         //обновить бд
                    //         if (worker.chatId === '1408579113' || worker.chatId === '805436270' || worker.chatId === '639113098' || worker.chatId === '1300119841' || worker.chatId === '276285228') {
                    //             newSpec = {
                    //                 spec: 'Вне категории',
                    //                 cat: 'NoTag'
                    //             }
                    //             newSpec2 = {
                    //                 spec: 'Тест',
                    //                 cat: 'Test'
                    //             }
                    //             specArr.push(newSpec)
                    //             specArr.push(newSpec2)

                    //             const res = await Worker.update({ 
                    //                 worklist: JSON.stringify(specArr)  
                    //             },
                    //             { 
                    //                 where: {chatId: worker.chatId} 
                    //             })
                    //         } else {
                    //             const res = await Worker.update({ 
                    //                 worklist: JSON.stringify([{
                    //                     spec: 'Вне категории',
                    //                     cat: 'NoTag'
                    //                 }]) 
                    //             },
                    //             { 
                    //                 where: {chatId: worker.chatId} 
                    //             })
                    //         }
                    //         console.log("Список специальностей (нет) обновлен! ", worker.chatId, i) 
                    //     }
                            
                    //     console.log("ФИО: ", worker.id, notion[0]?.fio, i)
                           
                    //     //получить аватарку
                    //     //...

                    //     //обновить фио
                    //     const res = await Worker.update({ 
                    //         userfamily: notion[0]?.fio.split(" ")[0],
                    //         username: notion[0]?.fio.split(" ")[1],
                    //         phone: notion[0]?.phone && notion[0]?.phone,
                    //         dateborn: notion[0].age?.start.split('-')[0],
                    //         city: notion[0].city && notion[0].city,                    
                    //         from: 'Notion',
                    //         comment: notion[0]?.comment ? notion[0]?.comment : '',
                    //         rank: notion[0]?.rank ? notion[0]?.rank : null,
                    //     },
                    //     { 
                    //         where: {chatId: worker.chatId} 
                    //     })
                    //     if (res) {
                    //        console.log("Специалист обновлен! ", worker.chatId, i) 
                    //     }else {
                    //         console.log("Ошибка обновления! ", worker.chatId, i) 
                    //     }
                        
                    // } else {
                    //     console.log("Специалист не найден в Notion!", worker.chatId, i) 
                    //}              

                }, 1000 * ++i)   
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = new WorkersController()