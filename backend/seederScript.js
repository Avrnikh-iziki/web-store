require('dotenv').config();

const productsData = require('./data/products');
const connectDB = require('./config/db'); 
const Product = require('./models/Product');

connectDB();

const importData = async ()=> {
    try{
         await Product.deleteMany({});

         await Product.insertMany(productsData)

         console.log("Date import success")
         process.exit();
    }catch (err){
        console.error("error with data import" + err)
        process.exit(1);    
    }
};

importData();
