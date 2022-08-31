const mysql = require("mysql");
const likes = require("../model/likes-model");
const connectionDB = require("../config/db");

exports.likeInfo = (req, res) => {
  const messages_id = req.params.id;
  const users_quadri = req.auth.userId;
  console.log(messages_id, users_quadri);

  let likedOrDisliked = `select message_liked,message_disliked from likes where likes_message_id = ? AND likes_message_quadri = ?`;

  connectionDB.query(
    likedOrDisliked,
    [messages_id, users_quadri],
    (err, result) => {
      
      if (err) {
        return res.status(400).json({ message: err.message });
      } else if (result[0] == null) {
        
        let addlike =
          " insert into likes ( likes_message_id,likes_message_quadri)values(?,?) ";

        connectionDB.query(
          addlike,
          [messages_id, users_quadri],
          (err, result) => {
            if (err) {
              return res.status(400).json({ message: err.message });
            }

            res.status(200).json({ message: result });
            
          }
        );
       
      }
      switch (req.body.like) {
        case "1": {
          if (result[0].message_liked == 0 && result[0].message_disliked == 0) {
            let liked = `update likes set message_liked = ? where likes_message_id = ? AND likes_message_quadri = ? `;
    
            connectionDB.query(
              liked,
              [req.body.like, messages_id, users_quadri],
              (err, data) => {
                if (err) {
                  return res.status(400).json({ message: err.message });
                } else {
                  let incCompteur =
                    "update messages set messages_likes = messages_likes + ? where messages_id = ?";
                  connectionDB.query(
                    incCompteur,
                    [req.body.like, messages_id],
                    (err, data) => {
                      if (err) {
                        return res.status(400).json({ message: err.message });
                      } else {
                        res.status(200).json({
                          message:
                            "message like et compteur dans table message incrementé",
                          data,
                        });
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.status(200).json({ message: "avis deja donné" });
          }
          break;
        }
        case "-1": {
          if (result[0].message_liked == 0 && result[0].message_disliked == 0) {
            let disliked = `update likes set message_disliked = ? where likes_message_id = ? AND likes_message_quadri = ?`;
            console.log(req.body.like);
            const message_disliked = "1";
            connectionDB.query(
              disliked,
              [message_disliked, messages_id, users_quadri],
              (err, data) => {
                if (err) {
                  return res.status(400).json({ message: err.message });
                } else {
                  let incCompteur =
                    "update messages set messages_dislikes = messages_dislikes + ? where messages_id = ?";
                  connectionDB.query(
                    incCompteur,
                    [Math.abs(req.body.like), messages_id],
                    (err, data) => {
                      if (err) {
                        return res.status(400).json({ message: err.message });
                      } else {
                        res.status(200).json({
                          message:
                            "message dislike et compteur dans table message incrementé",
                          data,
                        });
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.status(200).json({ message: "avis deja donné" });
          }
    
          break;
        }
    
        case "0":
          {
            if (result[0].message_liked == 0 && result[0].message_disliked == 0) {
              return res.status(400).json({
                message: " ce cas ne doit pas arriver en frontend",
              });
            }
    
            if (result[0].message_liked == 0) {
              let disliked = `update likes set message_disliked = ? where likes_message_id = ? AND likes_message_quadri = ?`;
              const regulation = -1;
              connectionDB.query(
                disliked,
                [req.body.like, messages_id, users_quadri],
                (err, data) => {
                  if (err) {
                    return res.status(400).json({ message: err.message });
                  } else {
                    let incCompteur =
                      "update messages set messages_dislikes = messages_dislikes + ? where messages_id = ?";
                    connectionDB.query(
                      incCompteur,
                      [regulation, messages_id],
                      (err, data) => {
                        if (err) {
                          return res.status(400).json({ message: err.message });
                        } else {
                          return res.status(200).json({
                            message:
                              "neutre et compteur dans table message incrementé de -1",
                            data,
                          });
                        }
                      }
                    );
                  }
                }
              );
            } else if (result[0].message_disliked == 0) {
              let disliked = `update likes set message_liked = ? where likes_message_id = ? AND likes_message_quadri = ?`;
    
              const regulation = -1;
              connectionDB.query(
                disliked,
                [req.body.like, messages_id, users_quadri],
                (err, data) => {
                  if (err) {
                    return res.status(400).json({ message: err.message });
                  } else {
                    let incCompteur =
                      "update messages set messages_likes = messages_likes + ? where messages_id = ?";
                    connectionDB.query(
                      incCompteur,
                      [regulation, messages_id],
                      (err, data) => {
                        if (err) {
                          return res.status(400).json({ message: err.message });
                        } else {
                          return res.status(200).json({
                            message:
                              "neutre et compteur table message incrementé de -1",
                            data,
                          });
                        }
                      }
                    );
                  }
                }
              );
            } else {
              return res.status(400).json({ message: err });
            }
          }
          break;
      }
    })
    };


   

/*
  switch (req.body.like) {
    case "1": {
      if (result[0].message_liked == 0 && result[0].message_disliked == 0) {
        let liked = `update likes set message_liked = ? where likes_message_id = ? AND likes_message_quadri = ? `;

        connectionDB.query(
          liked,
          [req.body.like, messages_id, users_quadri],
          (err, data) => {
            if (err) {
              return res.status(400).json({ message: err.message });
            } else {
              let incCompteur =
                "update messages set messages_likes = messages_likes + ? where messages_id = ?";
              connectionDB.query(
                incCompteur,
                [req.body.like, messages_id],
                (err, data) => {
                  if (err) {
                    return res.status(400).json({ message: err.message });
                  } else {
                    res.status(200).json({
                      message:
                        "message like et compteur dans table message incrementé",
                      data,
                    });
                  }
                }
              );
            }
          }
        );
      } else {
        res.status(200).json({ message: "avis deja donné" });
      }
      break;
    }
    case "-1": {
      if (result[0].message_liked == 0 && result[0].message_disliked == 0) {
        let disliked = `update likes set message_disliked = ? where likes_message_id = ? AND likes_message_quadri = ?`;
        console.log(req.body.like);
        const message_disliked = "1";
        connectionDB.query(
          disliked,
          [message_disliked, messages_id, users_quadri],
          (err, data) => {
            if (err) {
              return res.status(400).json({ message: err.message });
            } else {
              let incCompteur =
                "update messages set messages_dislikes = messages_dislikes + ? where messages_id = ?";
              connectionDB.query(
                incCompteur,
                [Math.abs(req.body.like), messages_id],
                (err, data) => {
                  if (err) {
                    return res.status(400).json({ message: err.message });
                  } else {
                    res.status(200).json({
                      message:
                        "message dislike et compteur dans table message incrementé",
                      data,
                    });
                  }
                }
              );
            }
          }
        );
      } else {
        res.status(200).json({ message: "avis deja donné" });
      }

      break;
    }

    case "0":
      {
        if (result[0].message_liked == 0 && result[0].message_disliked == 0) {
          return res.status(400).json({
            message: " ce cas ne doit pas arriver en frontend",
          });
        }

        if (result[0].message_liked == 0) {
          let disliked = `update likes set message_disliked = ? where likes_message_id = ? AND likes_message_quadri = ?`;
          const regulation = -1;
          connectionDB.query(
            disliked,
            [req.body.like, messages_id, users_quadri],
            (err, data) => {
              if (err) {
                return res.status(400).json({ message: err.message });
              } else {
                let incCompteur =
                  "update messages set messages_dislikes = messages_dislikes + ? where messages_id = ?";
                connectionDB.query(
                  incCompteur,
                  [regulation, messages_id],
                  (err, data) => {
                    if (err) {
                      return res.status(400).json({ message: err.message });
                    } else {
                      return res.status(200).json({
                        message:
                          "neutre et compteur dans table message incrementé de -1",
                        data,
                      });
                    }
                  }
                );
              }
            }
          );
        } else if (result[0].message_disliked == 0) {
          let disliked = `update likes set message_liked = ? where likes_message_id = ? AND likes_message_quadri = ?`;

          const regulation = -1;
          connectionDB.query(
            disliked,
            [req.body.like, messages_id, users_quadri],
            (err, data) => {
              if (err) {
                return res.status(400).json({ message: err.message });
              } else {
                let incCompteur =
                  "update messages set messages_likes = messages_likes + ? where messages_id = ?";
                connectionDB.query(
                  incCompteur,
                  [regulation, messages_id],
                  (err, data) => {
                    if (err) {
                      return res.status(400).json({ message: err.message });
                    } else {
                      return res.status(200).json({
                        message:
                          "neutre et compteur table message incrementé de -1",
                        data,
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          return res.status(400).json({ message: err });
        }
      }
      break;
  }
})
};
*/
