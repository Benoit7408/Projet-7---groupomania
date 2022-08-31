let regexLogin = /[<>}={_|^*~$]/;

module.exports = (req, res, next) => {
  if (regexLogin.test(req.body.quadri)) {
    req.invalidLogin = 1;
    console.log(!regexLogin.test(req.body.quadri))
    console.log(req.body.quadri)
    return res
      .status(401)
      .json({ message: "Veuilliez rentrer un login valide" });
  } else {
    next();
  }
};
