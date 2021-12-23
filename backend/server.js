const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const  connectDB  = require("./config/db");
const productRouts= require('./routes/productRoutes');
const addproduct = require('./routes/addProductRouter');
const admin = require('./routes/admin');
const email = require('./routes/email');
const category = require('./routes/category');
const company =require('./routes/company');
const employer = require("./routes/employer")
const path = require('path')
const app  = express();
require('dotenv').config();


connectDB();
app.use(express.json({limit:"50mb"}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))   

app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600 },
  })
);
app.use(cookieParser(process.env.SESSION));
app.use(passport.initialize());
app.use(passport.session()); 

app.use('/api/prodcuts',productRouts);
app.use('/api/addproducts',addproduct);
app.use('/api/admin/', admin); 
app.use('/api/email/send',email);
app.use('/api/category',category);
app.use('/api/company',company);
app.use('/api/employer',employer);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));    
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

const port =  process.env.PORT; 
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})