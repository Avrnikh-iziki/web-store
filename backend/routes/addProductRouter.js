const express = require("express");
const router = express.Router();
const { addAllProduct, deletProduct, updateProduct } = require("../controller/addproductController")

router.post("/", addAllProduct);
router.post("/update/:id", updateProduct);
router.delete("/:id", deletProduct);

module.exports = router;