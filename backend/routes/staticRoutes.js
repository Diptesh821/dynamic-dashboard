const express=require("express"); 
const router=express.Router();
const USER=require("../models/user.js");


/*post request to 
    /logout
*/
router.post("/logout",(req,res)=>{
    const token=req.cookies.token;
    res.clearCookie("token");
    res.status(200).send({message:"logged out successfully"});

})


 
module.exports=router; 