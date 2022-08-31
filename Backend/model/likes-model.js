const connectionDB = require("../config/db");



const Likes = function (like) {
  this.likes_message_id = like.id;
  this.likes_message_quadri = like.quadri;
  this.message_liked = like.liked;
  this.message_disliked =  like.disliked;
};

Likes.getAllLikeThisMessage = function (result){
  let getAllLikeThisMessage = "select likes_message_id,message_liked,message_disliked,messages_id from likes left join messages on likes_message_id=messages_id order by messages.messages_id desc limit 10  "

  connectionDB.query(getAllLikeThisMessage,(err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Likes
