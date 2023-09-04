const {Plan, Distributionw, Pretendent} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
//const { editDistributionW } = require('./../../client/src/http/adminAPI')

//const { useUsersContext }  = require("./../../client/src/chat-app-new/context/usersContext");

//fetch api
const fetch = require('node-fetch');

const token = process.env.TELEGRAM_API_TOKEN_WORK
const host_api_bottest = process.env.BOTTEST_API_URL

let tasks = []

class PlanController {

    //add plan
    async newPlan(req, res) {
        const {datestart, times} = req.body
        //console.log(datestart)
        try {
            // First try to find the record
            const foundItem = await Plan.findOne({ where: {datestart: datestart} });
            //console.log(foundItem)

            if (!foundItem) {
                // Item not found, create a new one
                const newPlan = await Plan.create({datestart, times})
                return res.status(200).json(newPlan);
            }

            // Found an item, update it
            const item = await Plan.update({times: times},{where: {datestart: datestart}});

            return res.status(200).json("Plan has been update successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get plans
    async getPlan(req, res) {
        const date = req.params.date
        try {           
            const plan = await Plan.findOne({
                where: {datestart: date}
            })
            return res.status(200).json(plan);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //delete plan
    async delPlan(req, res) {
        const id = req.params.id
        try {
            await Plan.destroy({
                where: { messageId: String(id) },
            })
            return res.status(200).json("Message has been delete successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get plans
    async addTimer(req, res) {
        const {users, plan, text, textButton, time, id, projId} = req.body
        try {  
            
            
            
            // console.log("!!!!Планирую запуск отправки собщения...!!!!")
            // const timerId = setTimeout(() => {
            //     users.map(async (user, index) => {
            //         console.log("Пользователю ID: " + user + " сообщение " + text + " отправлено! Кнопка " + textButton + " отправлена!")               

            //         //получить id специалиста по его telegramId
            //         //const worker = await getWorkerId(user)
            //         const worker = await fetch(host_api_bottest + '/workers/chat/' + user);
                    
            //         //новый претендент
            //         const pretendent = await Pretendent.create(projId, worker.data, user) //{projectId, workerId, receiverId})
              
            //         //Передаем данные боту
            //         const keyboard = JSON.stringify({
            //             inline_keyboard: [
            //                 [
            //                     {"text": textButton, callback_data:'/report'},
            //                 ],
            //             ]
            //         });
                
            //         const keyboard2 = JSON.stringify({
            //             inline_keyboard: [
            //                 [
            //                     {"text": 'Принять', callback_data:'/accept ' + pretendent.id}, //  + pretendent.id
            //                     {"text": 'Отклонить', callback_data:'/cancel'},
            //                 ],
            //             ]
            //         });

            //         //отправить в телеграмм
            //         let sendToTelegram
            //         if (text !== '') {
            //             const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user}&parse_mode=html&text=${text.replace(/\n/g, '%0A')}`
            //             //console.log("url_send_msg: ", url_send_msg)
                        
            //             //sendToTelegram = await $host.get(url_send_msg);
            //             sendToTelegram = await fetch(url_send_msg);

            //             //const objDelivered = {
            //             const delivered = true
            //             //}

            //             //обновить рассылке статус отправки
            //             //await editDistributionW(objDelivered, dataDistrib.id)
            //             let exist = await Distributionw.findOne( {where: {id: id}} )
            
            //             if(!exist){
            //                 res.status(500).json({msg: "Рассылка не существует!"});
            //                 return;
            //             }
            
            //             const newDistrib = await Distributionw.update(
            //                 { delivered },
            //                 { where: {id: id} })

            //             return res.status(200).json(newDistrib);
            //         }
            //     })
            // }, time)  
            
            // const obj = {
            //     task: timerId,
            //     projectId: projId
            // }

            // tasks.push(obj)
           
            //return res.status(200).json(plan);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new PlanController()