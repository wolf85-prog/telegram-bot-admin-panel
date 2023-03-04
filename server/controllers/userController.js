const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}    
    )
}

class UserController {

    //registration
    async registration(req, res, next) {
        const {username, email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, email, role, password: hashPassword})
        const token = generateJwt(user.id, user.username, user.email, user.role)
        return res.json({token})
    }

    //login
    async login(req, res, next) {
        const {email, password} = req.body
        // Find user by email
        const user = await User.findOne({where: {email}})
        // Check if user exists
        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }
        // Check password
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    //check
    async check(req, res, next) {
      const token = generateJwt(req.user.id, req.user.email, req.user.role)
      return res.json({token})
    }

    //getAll
    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }

    async getOne(req, res) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        return res.json(user)
    }
}

module.exports = new UserController()