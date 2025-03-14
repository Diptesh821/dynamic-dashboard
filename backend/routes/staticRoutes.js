const express=require("express"); 
const router=express.Router();
const USER=require("../models/user.js");


/*post request to 
    /logout
*/
router.post("/logout",(req,res)=>{
    const token=req.cookies.token;
    res.clearCookie("token",{
       httpOnly: true,
       secure: true,
       sameSite: "none",
      
      
    });
    res.status(200).send({message:"logged out successfully"});

})


 
module.exports=router; 