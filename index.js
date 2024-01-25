const express=require("express");
const path=require("path");
const bcrypt=require("bcrypt");
const collection=require("./config").default;
const Login = require("./config").default;
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine","ejs"); 
app.use(express.static("public"));

const port=5000;
app.listen(port,()=>{
     console.log(`Server is running on port: ${port}`);
});

app.get("/",(req,res)=>{
    res.render("login"); 
});
app.get("/signup",(req,res)=>{
     res.render("signup");
});

app.post("/signup",async (req,res)=>{
     const data= {
          name: req.body.username,
          password: req.body.password
     }
     const exitingUser= await collection.findOne({name:data.name});
     if(exitingUser){
          res.send("User already exists. Please choose a different username");
     }else{
     const saltRounds=10;
     const hashedPassword=await bcrypt.hash(data.password, saltRounds);
     data.password=hashedPassword;

     const  userdata=await Login.insertMany(data);
     console.log(userdata);
     }  
});

app.post("/login",async (req,res)=>{
 try{
     const check=await collection.findOne({name:data.name});
     if(!check){
          res.send("Username can't find");
     }
     const isPasswordMatch=await bcrypt.compare(req.body.password, check.password);
     if(isPasswordMatch){
          res.render("home");
     }else{
          res.send("Wrong Password!!!");
     }
 }catch{
     res.send("Wrong Details!!!!");
 }
});








