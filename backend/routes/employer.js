const express  = require("express");
const router   = express.Router();
const { getemployer, addemployer,delemployer } = require('../controller/employer')
router.get("/", getemployer); 
router.post("/",addemployer)
router.post('/:id',delemployer)

module.exports = router;  
