const Product = require("../models/Product");
const connectDB = require('../config/db');


const addAllProduct = async (req, res, next) => {
    connectDB();
    if (req.body.name) {
        if (req.body.name.length < 5 || req.body.name.length > 15) {
            res.json({ errs: { name: "name must be between 5-15 character" } })
        } else {

            if (req.body.title) {
                if (req.body.title.length < 80 || req.body.title.length > 200) {
                    res.json({ errs: { title: " title must be betwen  80-200 words" } })
                } else {

                    if (req.body.price) {
                        if (Number(req.body.price) != req.body.price) {
                            res.json({ errs: { price: "price must be a number" } })
                        } else {

                            if (req.body.offre) {
                                if (Number(req.body.offre) != req.body.offre) {
                                    res.json({ errs: { offre: "offre must be a number" } })
                                } else {

                                    if (req.body.countInStock) {
                                        if (Number(req.body.countInStock) != req.body.countInStock) {
                                            res.json({ errs: { countInStock: " countInStock must be a number" } })
                                        } else {

                                            if (req.body.category) {

                                                if (req.body.description) {
                                                    if (req.body.description.length < 300 || req.body.descriptionlength > 600) {
                                                        res.json({ errs: { description: "description must be betwen  300-600 words" } })
                                                    } else {
                                                        if (JSON.parse(req.body.details).length !== 0) {
                                                            if (JSON.parse(req.body.details).length < 3) {
                                                                res.json({ errs: { details: "tree quality are required at least" } })
                                                            } else {
                                                                if (JSON.parse(req.body.url).length > 0) {
                                                                    try {
                                                                        await Product.insertMany({
                                                                            name: req.body.name,
                                                                            imageUrl: JSON.parse(req.body.url),
                                                                            description: req.body.description,
                                                                            price: req.body.price,
                                                                            offre: req.body.offre,
                                                                            countInStock: req.body.countInStock,
                                                                            title: req.body.title,
                                                                            category: req.body.category,
                                                                            details: JSON.parse(req.body.details),
                                                                        });
                                                                        res.json({ success: { success: "a new product added successfully" } });
                                                                    } catch (err) {
                                                                        res.json({ errs: { err: "fail to add a new product" } })
                                                                    }
                                                                } else { res.json({ errs: { image: "images are required" } }) }
                                                            }
                                                        } else { res.json({ errs: { details: "details are required" } }) }
                                                    }
                                                } else { res.json({ errs: { description: "description is required" } }) }
                                            } else { res.json({ errs: { category: "category is required" } }) }
                                        }
                                    } else { res.json({ errs: { countInStock: "countInStock is required" } }) }
                                }
                            } else { res.json({ errs: { offre: "offre is required" } }) }
                        }
                    } else { res.json({ errs: { price: "price is required" } }) }
                }
            } else { res.json({ errs: { title: "title is required" } }) }
        }
    } else { res.json({ errs: { name: " name is required" } }) }


}

const deletProduct = async (req, res, next) => {
    connectDB();
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: { success: "product deleted" } }))
        .catch(err => res.json({ errs: { err: "delet product faild" } }))
}

const updateProduct = async (req, res, next) => {
    connectDB();
    if (req.body.name) {
        if (req.body.name.length < 5 || req.body.name.length > 15) {
            res.json({ errs: { name: "name must be between 5-15 character" } })
        } else {

            if (req.body.title) {
                if (req.body.title.length < 80 || req.body.title.length > 200) {
                    res.json({ errs: { title: " title must be betwen  80-200 words" } })
                } else {

                    if (req.body.price) {
                        if (Number(req.body.price) != req.body.price) {
                            res.json({ errs: { price: "price must be a number" } })
                        } else {

                            if (req.body.offre) {
                                if (Number(req.body.offre) != req.body.offre) {
                                    res.json({ errs: { offre: "offre must be a number" } })
                                } else {

                                    if (req.body.countInStock) {
                                        if (Number(req.body.countInStock) != req.body.countInStock) {
                                            res.json({ errs: { countInStock: " countInStock must be a number" } })
                                        } else {

                                            if (req.body.category) {

                                                if (req.body.description) {
                                                    if (req.body.description.length < 300 || req.body.descriptionlength > 600) {
                                                        res.json({ errs: { description: "description must be betwen  300-600 words" } })
                                                    } else {

                                                        if (JSON.parse(req.body.details).length !== 0) {
                                                            if (JSON.parse(req.body.details).length < 3) {
                                                                res.json({ errs: { details: "tree quality are required at least" } })
                                                            } else {
                                                                if (JSON.parse(req.body.url).length > 0) {
                                                                    await Product.findById(req.params.id)
                                                                        .then(product => {
                                                                            product.imageUrl = JSON.parse(req.body.url)
                                                                            product.name = req.body.name
                                                                            product.price = req.body.price
                                                                            product.countInStock = req.body.countInStock
                                                                            product.description = req.body.description
                                                                            product.details = JSON.parse(req.body.details)
                                                                            product.category = req.body.category
                                                                            product.offre = req.body.offre
                                                                            product.title = req.body.title
                                                                            product.save()
                                                                                .then(() => {
                                                                                    res.json({ success: { success: " product updated successfully" } })
                                                                                })
                                                                                .catch(err => res.json({ errs: { err: "fail to update product" } }))
                                                                        })
                                                                        .catch(err => res.json({ errs: { err: "fail to update product" } }))
                                                                } else { res.json({ errs: { image: "image are required" } }) }
                                                            }
                                                        } else { res.json({ errs: { details: "details are required" } }) }
                                                    }
                                                } else { res.json({ errs: { description: "description is required" } }) }
                                            } else { res.json({ errs: { category: "category is required" } }) }
                                        }
                                    } else { res.json({ errs: { countInStock: "countInStock is required" } }) }
                                }
                            } else { res.json({ errs: { offre: "offre is required" } }) }
                        }
                    } else { res.json({ errs: { price: "price is required" } }) }
                }
            } else { res.json({ errs: { title: "title is required" } }) }
        }
    } else { res.json({ errs: { name: " name is required" } }) }
}

module.exports = {
    addAllProduct,
    deletProduct,
    updateProduct,
}

