const emailValidator = require("validator");

module.exports = (req, res, next) => {
  if (!emailValidator.isEmail(req.body.email)) {
    req.invalidEmail = 1;

    return res
      .status(401)
      .json({ message: "Veuilliez rentrer un email valide" });
  } else {
    next();
  }
};
