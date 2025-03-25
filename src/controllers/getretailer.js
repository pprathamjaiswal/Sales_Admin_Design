const express = require("express");
const retailerService = require("../services/")

const getRetailersWithSingleWholesaler = async(req, res) => {
    try {
        const result = await retailerService?.
        res.status(200).json({status: true, data: result});
    } catch (error) {
        console.log("getRetailerWithSingleWholesaler error", error);
    }
}

module.exports = {getRetailersWithSingleWholesaler}