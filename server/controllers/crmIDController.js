const sequelize = require('../db')
const { QueryTypes } = require('sequelize');

class crmIDController {

    //get plans
    async getCrmID(req, res) {

        try {     
            
            await sequelize.query('CREATE SEQUENCE IF NOT EXISTS crm3_id INCREMENT BY 5000');

            const crm = await sequelize.query('SELECT nextval("crm3_id")', {
                type: QueryTypes.SELECT,
            });
            

            return res.status(200).json(crm);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new crmIDController()