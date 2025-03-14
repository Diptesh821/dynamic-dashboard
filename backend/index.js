require("dotenv").config();
const express=require("express"); 

const cors=require("cors");
const app=express();
const PORT=process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials:true,
  }));

const cookieparser=require("cookie-parser");
const {checkForAuthentication}=require("./middlewares/auth.js");


//mongodb connection
const {connectMongoDb}=require("./connection");
connectMongoDb(process.env.MONGO_URL);


//routes
const staticRoute=require("./routes/staticRoutes.js")
const userRoute=require("./routes/user.js")
const sheetsRoute=require("./routes/sheets.js")
const tableRoute=require("./routes/tables.js")

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkForAuthentication);
app.use(express.static("public"));
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    next();
});




app.use("/",staticRoute);
app.use("/user",userRoute);
app.use("/sheets",sheetsRoute);
app.use("/table",tableRoute);



app.listen(PORT,()=>{
    console.log(`mongo db connected ${PORT}`);
})