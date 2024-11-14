const ApiError = require('../error/ApiError')

class crmIDController {

    //get plans
    async getCrmID(req, res) {

        try {           
            
            const crm = sequelize.query("SELECT nextval('crm_id')", { 
                type: collection.Sequelize.QueryTypes.SELECT 
               });

            return res.status(200).json(crm);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new crmIDController()