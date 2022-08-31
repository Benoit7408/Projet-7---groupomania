const express = require("express");
const router = express.Router();

// Controllers

const newsCtrl = require("../controllers/news-ctrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

//route suivi de middleware et de controler

router.get("/all", newsCtrl.getAllNews);
router.get("/user/message/:quadri", newsCtrl.getAllNewsThisUser);
router.put("/user/message/:id" ,multer,newsCtrl.updateOneNews);
router.post("/post",auth, multer, newsCtrl.postNews);
router.delete("/user/message/:id", newsCtrl.deleteOneNews);




module.exports = router;
