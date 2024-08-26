const { unlink } = require('fs/promises')
const { dirname, join, path } = require('path')
const { fileURLToPath } = require('url')
const onError = require('./onError.js')

// путь к текущей директории
const _dirname = path.resolve(__dirname) //dirname(fileURLToPath(import.meta.url))

// путь к директории с файлами
const fileDir = join(_dirname, '../files')

// утилита для получения пути к файлу
export const getFilePath = (filePath) => join(fileDir, filePath)

// утилита для удаления файла
export const removeFile = async (filePath) => {
  try {
    await unlink(join(fileDir, filePath))
  } catch (e) {
    onError(e)
  }
}