const Router = require('express')
const router = new Router()
const userbotController = require('../controllers/userbotController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', userbotController.create)
router.get('/', userbotController.getAll)
router.get('/:id', userbotController.getOne)

module.exports = router