const sequelize = require('../db')
const { QueryTypes } = require('sequelize');

class crmIDController {

    //get plans
    async addCrmID(req, res) {

        try {     
            
            const crm = await sequelize.query('CREATE SEQUENCE IF NOT EXISTS crm4_id START 6000 INCREMENT BY 1');
            
            return res.status(200).json(crm);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //get plans
    async getCrmID(req, res) {

        try {     

            const crm = await sequelize.query("SELECT nextval('crm4_id')");

            const resid = crm[0][0].nextval
            

            return res.status(200).json(resid);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new crmIDController()