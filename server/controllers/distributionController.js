const { Distribution, Distributionw }= require('../models/models')
const ApiError = require('../error/ApiError')

class DistributionController {

    //add Distribution
    async newDistribution(req, res) {
        const {name, text, image, button, receivers, datestart, delivered} = req.body
        try {
            await Distribution.create({name, text, image, button, receivers, datestart, delivered})
            return res.status(200).json("Distribution has been sent successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getDistributions(req, res) {
        try {
            const distributions = await Distribution.findAll({
                order: [
                    ['id', 'DESC'],
                ],
            })
            return res.status(200).json(distributions);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getDistributionsId(req, res) {
        const {id} = req.params
        try {
            const distib = await Distribution.findAll({where: {chatId: id}})
            return res.status(200).json(distib);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getDistribution(req, res) {
        const {id} = req.params
        try {
            const distib = await Distribution.findOne({where: {id: id}})
            return res.status(200).json(distib);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    //delete message
    async delDistribution(req, res) {
        const id = req.params.id
        try {
            await Distribution.destroy({
                where: { id: String(id) },
            })
            return res.status(200).json("Distribution has been delete successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

//=========== Workhub =====================================================================

    //add Distribution
    async newDistributionW(req, res) {
        const {text, image, project, receivers, datestart, delivered, projectId, count, date, users, button, del, uuid} = req.body
        try {
            const distrib = await Distributionw.create({
                text, 
                image, 
                project, 
                receivers, 
                datestart, 
                delivered, 
                projectId, 
                count, 
                date, 
                users, 
                button,
                del,
                uuid
            })
            return res.status(200).json(distrib);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getDistributionsW(req, res) {
        try {
            const distributions = await Distributionw.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                where: {
                    delivered: true
                }
            })
            return res.status(200).json(distributions);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getDistributionsWPlan(req, res) {
        try {
            const distributions = await Distributionw.findAll({
                order: [
                    ['id', 'ASC'],
                ],
                where: {
                    delivered: false,
                }
            })
            return res.status(200).json(distributions);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getDistributionsWId(req, res) {
        const {id} = req.params
        try {
            const distib = await Distributionw.findAll({where: {chatId: id}})
            return res.status(200).json(distib);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getDistributionW(req, res) {
        const {id} = req.params
        try {
            const distib = await Distributionw.findOne({where: {id: id}})
            return res.status(200).json(distib);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    //delete message
    async delDistributionW(req, res) {
        const id = req.params.id
        try {
            await Distributionw.destroy({
                where: { id: String(id) },
            })
            return res.status(200).json("Distribution has been delete successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //delete message
    async delDistributionWPlan(req, res) {
        const {id, date} = req.body

        try {
            await Distributionw.destroy({
                where: { 
                    uuid: String(id),
                    date: String(date),
                    delivered: false,
                },
            })
            return res.status(200).json("Distribution has been delete successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    //обновить рассылку - поменять статус delivered
    async editDistribW(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Distributionw.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "distrib not exist"});
                return;
            }

            const {delivered} = req.body

            const newDistrib = await Distributionw.update(
                { delivered },
                { where: {id: id} })
            return res.status(200).json(newDistrib);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async editDistribW2(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Distributionw.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "distrib not exist"});
                return;
            }

            const {success, report} = req.body
            //console.log("success count distrib: ", success)
            //console.log("report: ", report)

            const newDistrib = await Distributionw.update(
                { success,
                  report, 
                },
                { where: {id: id} })
            return res.status(200).json(newDistrib);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //обновить рассылку - поменять статус del
    async editDistribWPlan(req, res) {
        const {id, date, del} = req.body
        try {    
            let exist=await Distributionw.findAll( {
                where: { 
                    uuid: String(id),
                    date: String(date),
                    delivered: false,
                }
            } )
            
            if(!exist){
                res.status(500).json({msg: "distrib not exist"});
                return;
            }

            const newDistrib = await Distributionw.update(
                { del },
                { where: { 
                    uuid: String(id),
                    date: String(date),
                    delivered: false,
                }})
            return res.status(200).json(newDistrib);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    //send message
    async sendDistribW(req, res) {
        const {id} = req.params  

        try {
            let exist=await Distributionw.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "distrib not exist"});
                return;
            }

            console.log("exist: ", exist)

            // selected.map(async (user, index) => {      
            //     //setTimeout(async()=> { 
            //     console.log(index + " Пользователю ID: " + user + " сообщение отправлено!")
            //     //arrUsers = []

            //     //информация об отправке
            //     setCountSend(index)
                
            //     if (index === selected.length - 1) {
            //         setShowSend(false)
            //         setVisible(true)
            //     }


            //     let client = clients.filter((client) => client.chatId === user)[0];
                
            //     //Передаем данные боту
            //     const keyboard = JSON.stringify({
            //         inline_keyboard: [
            //             [
            //                 {"text": textButton, callback_data:'/report'},
            //             ],
            //         ]
            //     });

            //     let keyboard2

            //     if (onButtonStavka) {
            //         keyboard2 = JSON.stringify({
            //         inline_keyboard: [
            //             [
            //                 {"text": 'Принять', callback_data:'/accept ' + valueProject},
            //                 {"text": 'Отклонить', callback_data:'/cancel ' + valueProject},
            //             ],
            //             [
            //                 {"text": "Предложить свою ставку", web_app: {url: webAppAddStavka + '/' + valueProject}},
            //             ],
            //         ]
            //         });
            //     } else {
            //         keyboard2 = JSON.stringify({
            //         inline_keyboard: [
            //             [
            //                 {"text": 'Принять', callback_data:'/accept ' + valueProject},
            //                 {"text": 'Отклонить', callback_data:'/cancel ' + valueProject},
            //             ],
            //         ]
            //         });
            //     }

            //     //по-умолчанию пока сообщение не отправлено
            //     arrUsers.push({
            //         user: user,
            //         status: 500,
            //     })        

            //     //отправить в телеграмм
            //     let sendTextToTelegram
            //     if (text !== '') {
            //         const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user}&parse_mode=html&text=${text.replace(/\n/g, '%0A')}`
                    
            //         console.log("Отправка текста...")
            //         sendTextToTelegram = await $host.get(url_send_msg);

            //         if (sendTextToTelegram?.data?.ok) {
            //         countSuccess = countSuccess + 1

            //         //обновить статус доставки
            //         arrUsers[index].status = 200  

            //         //обновить бд рассылку
            //         await editDistributionW2({success: countSuccess, report: JSON.stringify(arrUsers)}, distrNew.id)
            //         } else {
            //         console.log("Текстовое сообщение не отправлено!")
            //         }
            //     }  

            //     const url_send_photo = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${user}&reply_markup=${showEditButtonAdd ? keyboard : keyboard2}`
            //     //console.log("url_send_photo: ", url_send_photo)

            //     const url_send_photo2 = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${user}&photo=${host}${image}&reply_markup=${showEditButtonAdd ? keyboard : keyboard2}`
            //     //console.log("url_send_photo2: ", url_send_photo2)

            //     console.log("file: ", file)

            //     let sendPhotoToTelegram
            //     if (file) {
            //         const form = new FormData();
            //         form.append("photo", file);

            //         sendPhotoToTelegram = await $host.post(url_send_photo, form);
            //         console.log('sendPhotoToTelegram1: ', sendPhotoToTelegram)  

            //     } else {         
            //         sendPhotoToTelegram = await $host.get(url_send_photo2);
            //         console.log('sendPhotoToTelegram2: ', sendPhotoToTelegram)
            //     }

            //     if (sendPhotoToTelegram?.data?.ok && text === '') {
            //         countSuccess = countSuccess + 1
        
            //         //обновить статус доставки
            //         arrUsers[index].status = 200  

            //         //обновить бд рассылку
            //         await editDistributionW2({success: countSuccess, report: JSON.stringify(arrUsers)}, distrNew.id)
            //     } 

                
            //     //отправить в админку
            //     let message = {};
            //     if(text !== '') {
            //         console.log("no file")
            //             message = {
            //                 senderId: chatAdminId, 
            //                 receiverId: user,
            //                 conversationId: client.conversationId,
            //                 type: "text",
            //                 text: text,
            //                 isBot: true,
            //                 messageId: sendTextToTelegram?.data?.result?.message_id,
            //                 buttons: '',
            //             }
            //     } else if (file) {
            //         console.log("file yes")
            //             message = {
            //                 senderId: chatAdminId, 
            //                 receiverId: user,
            //                 conversationId: client.conversationId,
            //                 type: "image",
            //                 text: host + image,
            //                 isBot: true,
            //                 messageId: sendPhotoToTelegram?.data?.result?.message_id,
            //                 buttons: textButton,
            //             }
            //     }
            //     console.log("message send: ", message);

            //     //сохранение сообщения в базе данных wmessage
            //     await newMessage(message)

            //     //сохранить в контексте
            //     if(!file) {
            //         addNewMessage2(user, text, 'text', '', client.conversationId, sendTextToTelegram.data.result.message_id, true);
            //     } else {
            //         addNewMessage2(user, host + image, 'image', textButton, client.conversationId, sendPhotoToTelegram.data.result.message_id, true);
            //     }

            //     //обновить бд рассылку
            //     await editDistributionW2({success: countSuccess}, distrNew.id)
        

            //     //}, 500 * ++index)   

            // })

            return res.status(200).json("Distribution has been send successfully");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new DistributionController()