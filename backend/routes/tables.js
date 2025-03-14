const express=require("express");
const {createNewColumn,createNewTable,fetchColumns}=require("../controllers/tables.js")
const router=express.Router();


/*
/tablecolumn
*/
router.post("/column",createNewColumn);



/*
/table
*/
router.post("/",createNewTable);



/*
/table/columns
*/
router.get("/columns",fetchColumns);




module.exports=router;
