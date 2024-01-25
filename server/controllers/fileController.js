//const getFilePath = require('./../utils/file.js')
// import onError from './../utils/onError.js'
// import upload from './../utils/upload.js'
const ApiError = require('../error/ApiError')
const path = require('path')

// const soundNarush2 = require('./../assets/api/narushitel_2_ULEY.mp3');
//const soundNarush = require('./../assets/api/narushitel_ULEY.mp3');

const sound = require("sound-play");


class FileController {

    //Обрабатываем загрузку файлов:
    async uploadFile(req, res) {

        try {
            let filedata = req.file; 

            if(!filedata)
                res.send("Ошибка при загрузке файла");
            else {
                //res.send("Файл загружен");
                res.json(req.file)
            }

        } catch (error) {
            console.log(error.message)
            return res.status(501).json({message: "Upload error"});
        }
    }


    //Обрабатываем получение файлов:
    async getImage(req, res) {
        // try {
        //     // формируем абсолютный путь к файлу
        //     const filePath = getFilePath(req.url)           
        //     // и возвращаем файл по этому пути
        //     //res.status(200).sendFile(filePath)
        //     return res.status(200).sendFile(filePath);
        // } catch (error) {
        //     return res.status(500).json(error.message);
        // }
    }

    //запуск звуков:
    async sendNarush(req, res) {
        try {
            console.log("запуск звука Нарушитель")
            const filePath = path.join(__dirname, "../assets/api/narushitel_ULEY.mp3");

            await sound.play(filePath);
            console.log("done");

           return res.status(200).json({message: "Succes"});
        } catch (error) {
            console.log(error.message)
            return res.status(501).json({message: "Error"});
        }
    }
}

module.exports = new FileController()