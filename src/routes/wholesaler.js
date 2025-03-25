const express = require('express');
const router = express.Router();
const wholesalerController = require('../controllers/getwholesaler');

router.get("/:retailer_id", wholesalerController?.getWholesalerWithRetailers);
router.get("/montly_turnover", wholesalerController?.getMonthlyTurnover);
router.get("max_turnover", wholesalerController?.getMaximumTurnoverFromRetailer);

module.exports = router;
