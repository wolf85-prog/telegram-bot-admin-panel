require("dotenv").config();
const {Worker} = require('../models/workers')
const https = require('https');
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');

const host = process.env.HOST

//получить id блока заданной страницы по id
module.exports = async function updateAvatar(avatar, worker) {
    //обновление аватара
    if (avatar) {
        console.log("UPDATE avatar: ", avatar, worker.id) 
        try {
            //сохранить фото на сервере
            const date = new Date()
            const currentDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}T${date.getHours()}:${date.getMinutes()}`
            const directory = "/var/www/proj.uley.team/avatars";

            //if (avatar) {  

                //найти старое фото
                var fileName = worker.chatId; 
                fs.readdir(directory, function(err,list){
                    if(err) throw err;
                    for(var i=0; i<list.length; i++)
                    {
                        if(list[i].includes(fileName))
                        {
                            //удалить найденный файл (синхронно)
                            fs.unlinkSync(path.join(directory, list[i]), (err) => {
                                if (err) throw err;
                                console.log("Файл удален!")
                            });
                        }
                    }
                });

                //сохранить новое фото
                const file = fs.createWriteStream('/var/www/proj.uley.team/avatars/avatar_' + worker.chatId + '_' + currentDate + '.jpg');
                
                const transformer = sharp()
                .resize(500)
                .on('info', ({ height }) => {
                    console.log(`Image height is ${height}`);
                });
                
                const request = https.get(avatar, function(response) {
                    response.pipe(transformer).pipe(file);

                    // after download completed close filestream
                    file.on("finish", async() => {
                        file.close();
                        console.log("Download Completed");

                        const url = `${host}/avatars/avatar_` + worker.chatId + '_' + currentDate + '.jpg'

                        //обновить бд
                        const res = await Worker.update({ 
                            avatar: url,
                        },
                        { 
                            where: {chatId: worker.chatId} 
                        })

                        if (res) {
                            console.log("Аватар обновлен! ", url, worker.id) 
                        }else {
                            console.log("Ошибка обновления! ", worker.chatId) 
                        }
                    });
                });
            // } else {
            //     console.log("Аватар не читается! ", worker.chatId) 
            // }
        } catch (err) {
            console.error(err, new Date().toLocaleDateString());
        }
            
    } else {
        console.log("Аватар не найден в Notion!", worker.chatId) 
    }
                        
}