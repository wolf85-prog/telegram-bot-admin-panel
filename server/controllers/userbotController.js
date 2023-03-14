const UserBot = require('../models/UserBot')
const ApiError = require('../error/ApiError')

class UserbotController {

    async addUser(req, res) {       
        try {    
            let exist=await User.findOne( {sub: request.body.sub})
            
            if(exist){
                response.status(200).json({msg: "user already exist"});
                return;
            }

            const {first_name, last_name, chatId} = req.body

            const newUser = await UserBot.create({first_name, last_name, chatId})
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async editUser(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await UserBot.findOne( {where: {chatId: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {username} = req.body

            const newUser = await UserBot.update(
                { username },
                { where: {chatId: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await UserBot.findAll()
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getUser(req, res) {
        const {id} = req.params
        try {
            const userbot = await UserBot.findOne({where: {chatId: id}})
            return res.status(200).json(userbot);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = new UserbotController()