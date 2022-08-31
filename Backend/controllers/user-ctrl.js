const mysql = require("mysql");
const connectionDB = require("../config/db");
const User = require("../model/user-model");
const util = require("util");
const fs = require("fs");
//const nodemailer = require("nodemailer");

connectionDB.getConnection(function (err) {
  if (err) throw err;
  console.log("connection a la base");
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const query = util.promisify(connectionDB.query).bind(connectionDB);
//const createError = require("http-errors");

exports.signup = async function (req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);
  const quadri = await query(
    `select concat (substr(?,1,2), substr(?,1,2)) as quadri`,
    [req.body.first_name, req.body.last_name]
  );
if(req.file){
  const user = new User({
    quadri: quadri[0].quadri,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: hash,
    bio: req.body.bio || null,
    avatar: `${req.protocol}://${req.get("host")}/images/avatar/${
      req.file.filename
    }`,
    isAdmin: false,
    isActive: true,
  });

  User.create(user, (err, data) => {
    if (err) {
      return res.status(400).json({ message: "utilisateur non crée" });
    } else {
      User.userId(user.users_quadri, (err, data) => {
        console.log(data[0].users_id);
        if (err) {
          return res.status(400).json({ message: "utilisateur non trouvé" });
        } else {
          console.log(data[0].users_id);
          console.log(user.users_quadri);
          User.updateQuadri(
            [user.users_quadri + data[0].users_id.toString(), data[0].users_id],
            (err, result) => {
              if (err) {
                return res.status(400).json({ message: err.message });
              } else {
                return res.status(200).json({ message: result });
              }
            }
          );
        }
      });
    }
  });
}else{
  const user = new User({
    quadri: quadri[0].quadri,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: hash,
    bio: req.body.bio || null,
    avatar: "",
    
    isAdmin: false,
    isActive: true,
  });

  User.create(user, (err, data) => {
    if (err) {
      return res.status(400).json({ message: "utilisateur non crée" });
    } else {
      User.userId(user.users_quadri, (err, data) => {
        console.log(data[0].users_id);
        if (err) {
          return res.status(400).json({ message: "utilisateur non trouvé" });
        } else {
          console.log(data[0].users_id);
          console.log(user.users_quadri);
          User.updateQuadri(
            [user.users_quadri + data[0].users_id.toString(), data[0].users_id],
            (err, result) => {
              if (err) {
                return res.status(400).json({ message: err.message });
              } else {
                return res.status(200).json({ message: result });
              }
            }
          );
        }
      });
    }
  });


}
}
exports.login = function (req, res) {
  User.findOneByQuadri(req.body.quadri, (err, data) => {
    if (err) {
      return res.status(400).json({ message: "erreur de requete" });
    } else if (data.length == []) {
      return res.status(404).json({ message: "Aucun compte" });
    }
    console.log(data[0].users_password);

    bcrypt
      .compare(req.body.password, data[0].users_password)
      .then((CheckPassOk) => {
        if (!CheckPassOk) {
          return res
            .status(401)
            .json({ message: "Votre  mot de passe est incorrecte" });
        }

        res.status(200).json({
          message: "utilisateur ok",
          token: jwt.sign({ userId: req.body.quadri }, process.env.secretkey),
        });
      })
      .catch(function (error) {
        res.status(500).json({ error });
      });
  });
};

exports.updateUserPro = function (req, res) {
  User.userQuadri(req.params.quadri, (err, data) => {
    if (err) {
      return res.status(400).json({ message: "probleme de requete" });
    } else if (data.length == []) {
      return res
        .status(400)
        .json({ message: "il n'y a pas d'utilisateur correspondant" });
    }
    
    if (!req.file) {
      const user = new User({
        quadri: req.params.quadri,
        bio: req.body.bio,
        updateAt: new Date(),
        isActive: req.body.isActive,
        isAdmin: req.body.isAdmin,
      });
      console.log(req.params.quadri);
      console.log("utilisateru trouvé sans fichier");
      User.updateQuadri(user, (err, data) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        } else {
          return res.status(200).json({ message: data });
        }
      });
    } else {
      console.log("utilisateru trouvé et fichier");
      
      console.log(data[0].users_avatar);
      if ((data[0].users_avatar != "") || (data[0].users_avatar == null)) {
        const oldImage = data[0].users_avatar.split("/images/avatar/")[1];
        console.log(oldImage);
        fs.unlink(`images/avatar/${oldImage}`, () => {
          if (err) console.log(err);
          return res.status(200).json({ message: "image supprimée" }) ;
        });
      }

      const user = new User({
        quadri: req.params.quadri,
        bio: null || req.body.bio,
        updateAt: new Date(),
        isActive: req.body.isActive,
        isAdmin: req.body.isAdmin,
        avatar: `${req.protocol}://${req.get("host")}/images/avatar/${
          req.file.filename
        }`,
      });
      User.updateUser(user, (err, data) => {
        console.log(data);
        if (err) {
          return res.status(400).json({ message: err.message });
        } else {
          return res.status(200).json({ message: data });
        }
      });
    }
  });
};
