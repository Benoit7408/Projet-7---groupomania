const express = require("express");
const router = express.Router();

const likeCtrl= require("../controllers/likes-ctrl");
const auth = require("../middleware/auth");


router.post("/:id/like",auth,likeCtrl.likeInfo);

module.exports = router;