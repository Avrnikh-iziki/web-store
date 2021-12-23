const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl:{ 
        type: String ,
        required:true
    },
})

const Company = mongoose.model("company", companySchema);
module.exports = Company;