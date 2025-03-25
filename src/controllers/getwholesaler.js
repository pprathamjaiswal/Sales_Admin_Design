const wholesalerServices = require("../services")

const getWholesalerWithRetailers = async (req, res) => {
    try {
        let {id} = req?.params;

        const result = await wholesalerServices;
        res.status(200).json({success:true, data:result});
    } catch (error) {
        console.log("getWholesalerWithRetailer error", error)
    }
}

const getMonthlyTurnover = async (req, res) => {
    try {
        let year = req?.params;
        const result = await monthlyTurnoverServices;
        res.status(200).json({success:true, data:result})
    } catch (error) {
        console.log("getMontlyTurnover error", error);
    }
}

const getMaximumTurnoverFromRetailer = async(req, res) => {
    try {
        let result = await wholesalerServices;
        res.status(200).json({status: true, data: result});
    } catch (error) {
        console.log("getMaximumfromRetailer error", error);
        
    }
}


module.exports = {getWholesalerWithRetailers, getMonthlyTurnover, getMaximumTurnoverFromRetailer}