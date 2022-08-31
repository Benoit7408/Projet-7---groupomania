const express = require("express");
const router = express.Router();

const commentsCtrl = require("../controllers/comments-ctrl");
const auth = require("../middleware/auth");

router.get("/comments", auth, commentsCtrl.getAllComments);
router.get("/user/comments/:quadri", commentsCtrl.getAllCommentsThisUser);
router.put("/:quadri/comments/:id", auth, commentsCtrl.updateOneComments);
router.post("/:quadri/comments/:id", auth, commentsCtrl.postOneComments);
router.delete("/:quadri/comments/:id/",auth, commentsCtrl.deleteOneComments);


module.exports = router;
