export default function onError(err, req, res, next) {
    console.log(err)
  
    // если имеется объект ответа
    if (res) {
      // статус ошибки
      const status = err.status || err.statusCode || 500
      // сообщение об ошибке
      const message = err.message || 'Что-то пошло не так. Попробуйте позже'
      res.status(status).json({ message })
    }
  }