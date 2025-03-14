const express=require("express");
const {restrictTo}=require("../middlewares/auth.js")

const { getSheetData } = require("../controllers/sheets");
const router=express.Router();


router.get("/", getSheetData);

module.exports = router;