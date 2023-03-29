const multer  = require("multer");

const storage = multer.diskStorage({
    destination(req, file, cd) {
        cd(null, 'images/')
    },
    //замена оригинального названия файла на название текущей даты в миллесекундах
    filename(req, file, cb) {
        const filename = new Date().toISOString() + '-' + file.originalname //Date.now()
        //cb(null, `${filename}.jpg`)
        cb(null, filename)
    }
})

const types = ['image/png', 'image/jpeg', 'image/jpg', 'file/pdf', 'file/xlsx']

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({storage, fileFilter})