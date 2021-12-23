const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    offre: {
        type: Number,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    imageUrl: [{ type: String }],

    category: {
        type: String,
        required: true
    },
    details: [{ qty: String, value: String }],
    title: {
        type: String,
        required: true,
    }

})

const Product = mongoose.model("product", productSchema);

module.exports = Product;