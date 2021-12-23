const express  = require("express");
const router   = express.Router();
const { email} = require('../controller/email')
router.post("/", email);

module.exports = router;
