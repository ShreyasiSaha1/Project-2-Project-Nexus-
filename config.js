const mongoose=require('mongoose');
const connect=mongoose.connect("mongodb://localhost:27017/Rusha");

connect.then(()=>{
     console.log("Database connceted successfully");
})
.catch(()=>{
console.log("Database can't be connected");
});

const loginSchema=new mongoose.Schema({
     name:{
          type: String,
          required: true
     },
     password:{
          type: String,
          required:true
     }
});
const Saha=new mongoose.model("Saha",loginSchema);
module.exports = Saha;
