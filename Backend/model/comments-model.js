const connectionDB = require("../config/db");

const Comments = function (comments) {
  this.comments_id = comments.id;
  this.comments_quadri = comments.quadri;
  this.comments_message_id = comments.message_id;
  this.comments_content = comments.content;
  this.comments_isActive = comments.isActive;
};

Comments.getAllComments = function (result) {
  let getComments = `select * from comments `;

  connectionDB.query(getComments, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Comments.getAllCommentsThisUser = function (comments, result) {
  let allCommentsQuadri =
    "select * from comments join users where users_quadri=comments_quadri and comments_quadri = ?";

  connectionDB.query(
    allCommentsQuadri,
    comments.comments_quadri,
    (err, res) => {
      console.log(comments.comments_quadri);
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Comments.updateOneComments = function (comments, result) {
  let updateOneComments = `update comments set
    comments_content = ?,comments_updateAt = ?,comments_isActive = ? where comments_id = ? `;

  connectionDB.query(
    updateOneComments,
    [
      comments.comments_content,
      comments.comments_updateAt,
      comments.comments_isActive,
      comments.comments_id,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Comments.postOneComments = function (comments, result) {
  let postComments = `insert into
  comments (
    comments_quadri,
    comments_content,
    comments_id
  )
  values
  (?, ?,?)
`;
  connectionDB.query(
    postComments,
    [comments.comments_quadri, comments.comments_content,comments.comments_message_id],
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, { comments });
      }
    }
  );
};

Comments.deleteOneComments = function (comments, result) {
  let deleteOneComments = `update comments set
    comments_isActive = 0 where comments_id = ? `;

  connectionDB.query(deleteOneComments, [comments.comments_id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


module.exports = Comments;
