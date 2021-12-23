const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    category: {
        type:String,
        required:true,
    },
    slage : {
        type:String,
        required : true,
    },
    image :{
        type:String,
        require:true,
    }
})

const Category = mongoose.model("category",categorySchema);
module.exports = Category ; 