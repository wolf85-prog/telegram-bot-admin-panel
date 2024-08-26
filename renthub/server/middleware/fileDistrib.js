const { existsSync, mkdirSync } = require('fs');
const multer  = require("multer");
const { path, join } = require('path')

const host_server = process.env.HOST_SERVER

// путь к текущей директории
//const _dirname = path.resolve(__dirname) 

const storage = multer.diskStorage({
    destination(req, file, cd) {
        
        cd(null, `${host_server}/distrib`)
    },

    //замена оригинального названия файла на название текущей даты в миллесекундах
    filename(req, file, cb) {
        const ras = file.originalname.split('.')
        //console.log("Расширение файла: ", ras[ras.length - 1])


        const filename = new Date().toISOString() + '.' + ras[ras.length - 1] //Date.now()
        cb(null, filename)
    }
})

// const types = ['image/png', 'image/jpeg', 'image/jpg', 'file/pdf', 'file/xlsx','file/xls', 'file/docx', 'file/doc']
// // определение фильтра
// const fileFilter = (req, file, cb) => {
//     if (types.includes(file.mimetype)) {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

module.exports = multer({storage})