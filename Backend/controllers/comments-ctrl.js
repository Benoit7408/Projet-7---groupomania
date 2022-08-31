const mysql = require("mysql");
const connectionDB = require("../config/db");
const Comments = require("../model/comments-model");

connectionDB.getConnection(function (err) {
  if (err) throw err;
  console.log("connecte");
});

exports.getAllComments = function (req, res) {
  Comments.getAllComments((err, data) => {
    console.log(data);
    if (err) {
      return res.status(400).json({ message: err.message });
    } else {
      return res.status(200).json({ message: data });
    }
  });
};

exports.getAllCommentsThisUser = function (req, res) {
  const comments = new Comments({
    quadri: req.params.quadri,
  });
  Comments.getAllCommentsThisUser(comments, (err, data) => {
    console.log(data);
    if (err) {
      return res.status(400).json({ message: err.message });
    } else {
      return res.status(200).json({ message: data });
    }
  });
};

exports.updateOneComments = function (req, res) {
  const comments = new Comments({
    content: req.body.content,
    updateAt: new Date(),
    isActive: true,
    id: req.params.id,
    quadri: req.body.quadri,
  });
  console.log("req.params.quadri");
  console.log(req.params.quadri);

  console.log("auth");
  console.log(req.auth);

  if (req.auth.userId === req.params.quadri) {
    Comments.updateOneComments(comments, (err, data) => {
      console.log("data");
      console.log(data);
      if (err) {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(200).json({ message: data });
      }
    });
  } else {
    return res.status(400).json({ message: "pas autoriser" });
  }
};

exports.postOneComments = function (req, res) {
  const comments = new Comments({
    quadri: req.auth.userId,
    content: req.body.content,
    message_id:req.params.id
  });
  console.log("req.params.quadri");
  console.log(req.params.quadri);
  console.log(req.params.id)

  console.log("auth");
  console.log(req.auth.userId);
  
  if (req.auth.userId === req.params.quadri) {
  Comments.postOneComments(comments, (err, data) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    } else {
      return res.status(200).json({ message: data });
    }
  });
} else{
  return res.status(400).json({ message: "pas autoriser" });
}
};


exports.deleteOneComments = function (req, res) {
  const comments = new Comments({
    id: req.params.id,
    quadri: req.auth.userId
  });

  if (req.auth.userId === req.params.quadri){

  
  Comments.deleteOneComments(comments, (err, data) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    } else {
      return res.status(200).json({ message: data });
    }
  });
}else {
  return res.status(400).json({ message: "pas autoriser" });
}
};