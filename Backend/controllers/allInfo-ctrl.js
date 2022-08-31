const connectionDB = require("../config/db");

const Likes = require("../model/likes-model");

exports.getAllInfo = function (req, res) {
  let getInfo =
    "select messages.*,group_concat(comments.comments_quadri) AS QUADRI, group_concat(comments.comments_content) AS COMMENTAIRE from messages left join comments on messages.messages_id = comments_message_id group by messages.messages_id order by messages.messages_id desc limit 10 ;";
  connectionDB.query(getInfo, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      let resultData = [];

      result.forEach((element) => {
        resultData.push({
          id: element.messages_id,
          created: element.messages_createdAt,
          quadri: element.messages_quadri,
          content: element.messages_content,
          image: element.messages_imageUrl,
          like: element.messages_likes,
          dislikes: element.messages_dislikes,
          commentQuadri: element.QUADRI,
          commentContent: element.COMMENTAIRE,
          datalikes: [],
          datadislikes:[]
        });
      });

      Likes.getAllLikeThisMessage((err, data) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        data.forEach((element2) => {
          for (const element of resultData) {
            if (
              element2.message_liked == 1 &&
              element2.likes_message_id == element.id
            ) {
              console.log(element);
              element.datalikes.push(element2.likes_message_quadri);
            }
            else if (
              element2.message_disliked == 1 &&
              element2.likes_message_id == element.id
            ) {
              console.log(element);
              element.datadislikes.push(element2.likes_message_quadri);
            }
          }
        });
        console.log(resultData);

        return res.status(200).json({resultData});
      });

      // fin du premier forEach resultData accessible
    }
  });
};

/*
Likes.getAllLikeThisMessage((err, data) => {
  if (err) {
    return res.status(400).json({ message: err.message });
  } else {
    data.forEach((element2) => {
      if (resultData.id === element2.messages_id) {
        if (element2.message_liked === 1) {
          datalikes.push({
            id: element2.likes_message_id,
            liked: element2.likes_message_quadri,
          });
        } else if (element2.message_disliked == 1) {
          datalikes.push({
            id: element2.likes_message_id,
            disliked: element2.likes_message_quadri,
          });
        }
      }
    });
  }
});



*/

/* essai de creation reponse data DU MESSAGE En json, interieur  data comment en json( autre requete) et data like json 

  /*
  SELECT messages.*, comments.comments_quadri,comments.comments_content GROUP_CONCAT(comments.comments_content SEPARATOR ",")
FROM `messages`
LEFT JOIN `comments` ON `messages.messages_id` = `comments_message_id`
GROUP BY `comments_content`
  

select messages.*,comments.comments_quadri,comments.comments_content, group_concat(comments_content),group_concat(comments_quadri) from messages left join comments on messages.messages_id = comments_message_id group by comments_message_id;


*/
