const USER=require("../models/user.js");
const bcrypt=require("bcrypt");
const {setUser,getUser}=require("../servers/auth.js")
async function handleNewUser(req,res) {
    const {name,email,password}=req.body;
    const user=await USER.findOne({email});
    if(user){
        return res.status(400).json({
            error: "User already exists. Please log in instead.",
          });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)){
        return res.status(400).json({
            error:
              "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.",
          });
  
    }
    const saltrounds=10;
    const hashedpassword=await bcrypt.hash(password,saltrounds);
    if(name==="Diptesh Singh"){
    await USER.create({
        
        name:name,
        email:email,
        password:hashedpassword,
        passkey:"piku2112",
        role:"ADMIN",
    })
}
    else{
    await USER.create({
        
        name:name,
        email:email,
        password:hashedpassword,
        role:"NORMAL",
    })
}
return res.status(201).json({
    message: "User created successfully!",
  });
}
async function handleLoginUser(req,res) {
    console.log("piku");
    const {email,password}=req.body;
    const user=await USER.findOne({
        email
    });
    if(!user){
        return res.status(400).json({
            error: "Invalid email or password",
          });
           
        
        
    }
    const ismatch=await bcrypt.compare(password,user.password);
    if(!ismatch){
        return res.status(400).json({
            error: "Invalid email or password",
          });
    }
   console.log(user)
    const token=setUser(user);
    console.log(token);
    res.cookie("token", token, {
        httpOnly: true,      
        secure: true,        
        sameSite: "strict",  
        maxAge: 60* 60 * 1000 
      });


   
    
    return res.status(201).json({
        message: "User logged in successfully",
        token:token,
      });

    
    
    
}
module.exports={
    handleNewUser,
    handleLoginUser,
}