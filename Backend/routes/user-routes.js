const express = require("express");
const router = express.Router();


// Controllers

const userCtrl = require("../controllers/user-ctrl");
const password = require("../middleware/password");
const email = require("../middleware/email");
const input = require ("../middleware/regex-input");
const multerA = require("../middleware/multer-avatar");
//const info = require("../middleware/node-mailer");

//route suivi de middleware et de controler

router.post("/signup" ,multerA,userCtrl.signup);
router.post("/login",input, userCtrl.login);
router.put("/user/:quadri",multerA,userCtrl.updateUserPro);

module.exports = router;
