const express = require('express');
const retailerController = require("../controllers/getretailer");
const router = express.Router();

router.get('/single', retailerController?.getRetailersWithSingleWholesaler);

module.exports = router;