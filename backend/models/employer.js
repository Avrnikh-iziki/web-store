const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({

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

const Employer = mongoose.model("employer", employerSchema);

module.exports = Employer;