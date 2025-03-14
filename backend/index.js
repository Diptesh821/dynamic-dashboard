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





app.get("/test/set-cookie", (req, res) => {
    // Setting a cross-site cookie requires:
    // - sameSite: "none"
    // - secure: true (if you're using HTTPS, which you should on Render)
    // The cookie name here is "test_cookie"
    res.cookie("test_cookie", "test_value", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 1000, // 1 minute for demo
    });
  
    // Send a simple JSON response
    res.json({ message: "Test cookie set" });
  });
  
  // 2. Checks if the test cookie is present
  app.get("/test/check-cookie", (req, res) => {
    // 'test_cookie' is the cookie name we set above
    const cookieValue = req.cookies.test_cookie;
    if (!cookieValue) {
      // Cookie is missing => either blocked or not set
      return res.json({ hasCookie: false });
    }
    // Cookie is present
    res.json({ hasCookie: true });
  });






app.use("/",staticRoute);
app.use("/user",userRoute);
app.use("/sheets",sheetsRoute);
app.use("/table",tableRoute);



app.listen(PORT,()=>{
    console.log(`mongo db connected ${PORT}`);
})