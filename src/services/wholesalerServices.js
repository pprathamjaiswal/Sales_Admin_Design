const {Wholesaler, Retailer, Stock, sequelize}  = require("../models");
const {OP} = require("sequelize");

const getWholesalerwithRetailers = async(wholesaler_id) => {
    try {
        const wholesaler = await Wholesaler.findByPk(wholesaler_id, {include:[{model: Retailer}]})
        if(!wholesaler){
            throw new Error("wholesaler not found");
        }
        return wholesaler;
    } catch (error) {
        console.log("error", error);
    }
}

const getMonthlyTurnover = async (year = 2021) => {
    try {
        const result = await Stock.findAll({
            attributes:[
                [sequelize.fn("EXTRACT", sequelize.literal("MONTH FROM 'date'")), "month"],
                'wholesaler_id',
                [sequelize.fn("SUM", sequelize.col('stock_amount')), 'total_turnover']
            ],
            where:sequelize.where(sequelize.fn("EXTRACT", sequelize.literal("YEAR FROM 'DATE'")), year),
            group: ['wholesaler_id', sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "date"'))],
            order: ['wholesaler_id', [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "date"')), 'ASC']],
            include: [{
                model: Wholesaler,
                attributes: ['name']
            }]
        })
        return result;
    } catch (error) {
        console.log("error", error);
        
    }
}

const getMaxTurnoverfromRetailer = async() => {
    try {
        const result = await sequelize.query(`
            WITH retailer_turnover AS (
            SELECT 
            w.id AS wholesaler_id, 
            w.name AS wholesaler_name,
            r.id AS retailer_id, 
            r.name AS retailer_name,
            SUM(s.stock_amount) AS total_turnover,
            RANK() OVER (PARTITION BY w.id ORDER BY SUM(s.stock_amount) DESC) AS rnk
          FROM 
            wholesalers w
            JOIN stocks s ON w.id = s.wholesaler_id
            JOIN retailers r ON r.id = s.retailer_id
          GROUP BY 
            w.id, w.name, r.id, r.name
        )
        SELECT 
          wholesaler_id, 
          wholesaler_name,
          retailer_id,
          retailer_name,
          total_turnover
        FROM 
          retailer_turnover
        WHERE 
          rnk = 1
        ORDER BY 
          wholesaler_id
      `, { type: sequelize.QueryTypes.SELECT });
      return result;
    } catch (error) {
        console.log("error", error);
    }
}

module.exports = {getWholesalerwithRetailers, getMonthlyTurnover, getMaxTurnoverfromRetailer }