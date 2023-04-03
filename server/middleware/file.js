const { existsSync, mkdirSync } = require('fs');
const multer  = require("multer");
const { path, join } = require('path')

// путь к текущей директории
//const _dirname = path.resolve(__dirname) 

const storage = multer.diskStorage({
    destination(req, file, cd) {

        // файлы хранятся по комнатам
        // название директории - идентификатор комнаты
        //const dirPath = join(_dirname, '../images', '111')
        //console.log("dirPath: ", dirPath)

        // создаем директорию при отсутствии
        // if (!existsSync(dirPath)) {
        //     mkdirSync(dirPath, { recursive: true })
        // }

        cd(null, 'images/')
    },
    //замена оригинального названия файла на название текущей даты в миллесекундах
    filename(req, file, cb) {
        strRegexp = originalname.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        const filename = new Date().toISOString() + '-' + file.strRegexp //Date.now()
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