const Category = require("../models/category");
const Product = require("../models/Product");
const connectDB = require('../config/db');

const addAllCategory = async (req, res, next) => {
    connectDB();
    if (req.body.category) {
        var slage = req.body.category.replace(/\s/g, "-").toLowerCase();
        Category.findOne({ slage: slage }, async (err, docs) => {
            if (docs) {
                res.json({ errs: { category: "category already exist" } })
            }
            else {
                if (req.body.url) {
                    try {
                        await Category.insertMany({
                            category: req.body.category,
                            image: req.body.url,
                            slage: slage,
                        });
                        res.json({ success: { category: "new category added" } })
                    }
                    catch (err) {
                        res.json({ errs: { category: "add a new category faild " } })
                    }
                } else {
                    res.json({ errs: { image: "image is required" } })
                }
            }
        })
    } else {
        res.json({ errs: { category: "categoy is required" } })
    }
}

const updateCategory = async (req, res, next) => {
    connectDB();
    if (req.body.category) {
        Category.findById(req.params.id)
            .then(async cat => {
                Category.findOne({ category: req.body.category, _id: { $ne: req.params.id } })
                    .then((docs) => {
                        if (docs) { res.json({ errs: { category: "category already exist" } }) }
                        else {
                            if (req.body.url) {
                                try {
                                    cat.category = req.body.category
                                    cat.image = req.body.url
                                    cat.slage = req.body.category.replace(/\s/g, "-").toLowerCase()
                                    cat.save()
                                    res.json({ success: { category: " update category successed" } })
                                } catch (err) { res.json({ errs: { category: " update category faild " } }) }
                            } else { res.json({ errs: { image: "image is required" } }) }
                        }
                    })
            })
            .catch(() =>
                res.json({ errs: { category: " this category doesn't exist " } }))
    } else {
        res.json({ errs: { category: "category is required" } })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.json(category)
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

const getAllategory = async (req, res, next) => {
    connectDB();
    try {
        const categorys = await Category.find({});
        res.json(categorys)
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

const deletCategory = async (req, res, next) => {
    connectDB();
    Product.deleteMany({ category: req.params.category })
        .then(() => Category.deleteOne({ category: req.params.category }))
        .then(() =>
            res.json({ success: "category has been deleted" }),
        )
        .catch(err => res.status(400).json("Error: " + err));
}

module.exports = {
    getAllategory,
    addAllCategory,
    deletCategory,
    updateCategory,
    getCategory,
};
