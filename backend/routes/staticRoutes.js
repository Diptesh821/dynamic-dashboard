const isProduction = process.env.NODE_ENV === "production";
const express=require("express"); 
const router=express.Router();


/*post request to 
    /logout
*/
router.post("/logout",(req,res)=>{
    const token=req.cookies.token;
    res.clearCookie("token",{
       httpOnly: isProduction,
       secure: isProduction?"none":"lax",
       sameSite: "lax",
      
      
    });
    res.status(200).send({message:"logged out successfully"});

})


 
module.exports=router; 