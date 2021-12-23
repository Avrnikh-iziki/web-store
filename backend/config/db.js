require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
         await mongoose.connect(process.env.URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
         });       
    }catch(err){
        console.log(err)
        console.error("MongoDB conection FAIL" + err)
        process.exit(1)
    }
};


module.exports= connectDB 
    