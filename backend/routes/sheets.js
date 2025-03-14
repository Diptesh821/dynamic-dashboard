const express=require("express");

const { getSheetData } = require("../controllers/sheets");
const router=express.Router();


router.get("/", getSheetData);

module.exports = router;