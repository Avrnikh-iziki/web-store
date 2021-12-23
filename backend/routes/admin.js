const express = require("express");
const router = express.Router();
const { login, getuser ,register, delet, getoneuser,updateUser} =require("../controller/admin")

router.get("/user/:id",getoneuser);
router.post("/user/:id",updateUser);
router.get("/user",getuser);
router.post("/register",register);
router.post("/register/:id",delet);
router.post("/login",login);




module.exports = router;
