const express  = require("express");
const router   = express.Router();
const { getcompanydetail , addcompanydetail  } = require('../controller/company')
router.get("/", getcompanydetail); 
router.post("/",addcompanydetail);


module.exports = router;  