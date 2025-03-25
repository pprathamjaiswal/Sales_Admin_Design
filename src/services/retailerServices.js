const {Retailer, Wholesaler, sequelize } = require("../models");
const {OP} = require("sequelize");

const getRetailersWithSingleWholesaler = async () => {
    try {
        const result = await sequelize.query(`
            SELECT 
          r.id, 
          r.name,
          r.mobile_number,
          COUNT(wr.wholesaler_id) AS wholesaler_count
        FROM 
          retailers r
          LEFT JOIN wholesaler_retailer wr ON r.id = wr.retailer_id
        GROUP BY 
          r.id, r.name, r.mobile_number
        HAVING 
          COUNT(wr.wholesaler_id) = 1
      `, { type: sequelize.QueryTypes.SELECT });
      
      return result;
        
    } catch (error) {
        console.log("error", error);
        
    }
}

module.exports = {getRetailersWithSingleWholesaler};