const connectionDB = require("../config/db");

//------------------ modele de news---------------
const News = function (news) {
  this.messages_id = news.id;
  this.messages_quadri = news.quadri;
  this.messages_content = news.content;
  this.messages_imageUrl = news.imageUrl;
  this.messages_likes = news.likes;
  this.messages_dislikes = news.dislikes;
};

// -------differente methodes pour aller chercher les informations dans la base-----

News.getAllNews = function (result) {
  let allNews = `select * from messages`;

  connectionDB.query(allNews, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

News.getAllNewsThisUser = function (news, result) {
  let allNewsQuadri = `select * from messages join users where users_quadri=messages_quadri and messages_quadri= ?`;
  connectionDB.query(allNewsQuadri, news.messages_quadri, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

News.getOneNewsThisUser = function (req, result) {
  let OneNewsQuadri = `select * from messages join users where users_quadri=messages_quadri and messages_id= ?`;
  connectionDB.query(OneNewsQuadri, [req], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


News.updateOneNews = function (news, result) {
  let updateOneNews = `update messages set
    messages_content = ?,
    messages_imageUrl = ?,
    messages_updateAt = ?,
    messages_isActive = ? 
    where messages_id = ? `;

  connectionDB.query(
    updateOneNews,
    [
      news.messages_content,
      news.messages_imageUrl,
      news.messages_updateAt,
      news.messages_isActive,
      news.messages_id,
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

News.postOneNews = function (news, result) {
  let postNews = `insert into
  messages (
  
    messages_quadri,
    messages_content,
    messages_imageUrl,
    messages_likes,
    messages_dislikes
  )
  values
  (?, ?, ?, ?, ?)
`;
  connectionDB.query(
    postNews,
    [
      news.messages_quadri,
      news.messages_content,
      news.messages_imageUrl,
      news.messages_likes,
      news.messages_dislikes,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, { news });
      }
    }
  );
};

News.deleteOneNews = function (news, result) {
  let deleteOneNews = `update messages set
    messages_isActive = 0 where messages_id = ? `;

  connectionDB.query(deleteOneNews, [news.messages_id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = News;
