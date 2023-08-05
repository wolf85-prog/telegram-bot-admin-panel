require("dotenv").config();
const { Client } = require("@notionhq/client");
// const { getProjectCrmId } = require('./../../client/src/http/adminAPI')
// const { $host_bot } = require('./../../client/src/http/index')

class PosterController {

    async sendPoster(req, res) {
        // const token = process.env.TELEGRAM_API_TOKEN
        // const host = process.env.HOST
        // const {crmId, chatId, ver} = req.body;
        // try {
        //     //const poster = 'https://proj.uley.team/files/1389/pre/1389_1408579113_customer.pdf'
        //     const poster = `${host}/files/${crmId}/pre/${crmId}_${chatId}_customer_${ver}.pdf`
        //     console.log("poster API: ", poster)

        //     const projectId = await getProjectCrmId(crmId)

        //     //Передаем данные боту
        //     const keyboard = JSON.stringify({
        //         inline_keyboard:[
        //             [{text: 'Подтвердить', callback_data:'/smeta ' + projectId}]
        //         ]
        //     });

        //     console.log("Отправляю постер...")
        //     const url_send_poster = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${chatId}&reply_markup=${keyboard}`
            
        //     sendPosterToTelegram = await $host_bot.post(url_send_poster);

        //     //сохранение сметы в базе данных
        //     //const convId = await sendMessageAdmin(poster, "image", chatId, messageId, true, 'Подтверждаю')

        //     // Подключаемся к серверу socket
        //     // let socket = io(socketUrl);
        //     // socket.emit("addUser", chatId)

        //     // //сохранить в контексте (отправка) сметы в админку
        //     // socket.emit("sendAdmin", { 
        //     //     senderId: chatTelegramId,
        //     //     receiverId: chatId,
        //     //     text: poster,
        //     //     type: 'image',
        //     //     buttons: 'Подтверждаю',
        //     //     convId: convId,
        //     //     messageId,
        //     // })

        //     return res.status(200).json("Poster has been sent successfully");
        // } catch (error) {
        //     return res.status(500).json(error.message);
        // }
    }
}

module.exports = new PosterController()