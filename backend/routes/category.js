const express = require("express");
const router = express.Router();
const { getAllategory, addAllCategory, deletCategory, updateCategory, getCategory } = require("../controller/category")

router.get("/", getAllategory);
router.get("/:id", getCategory);
router.post("/",addAllCategory);
router.post("/:category", deletCategory);
router.post("/update/:id", updateCategory);

module.exports = router;