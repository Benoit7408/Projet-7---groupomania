
const passwordValidator = require('password-validator');


const passwordSchema = new passwordValidator();


passwordSchema
  .is()
  .min(1) 
  .is()
  .max(100) 
  .has()
  .uppercase(0) 
  .has()
  .lowercase(0) 
  .has()
  .digits()
  .not()
  .has()
  .not()
  .spaces() 
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

  module.exports = (req, res, next) => {
   
    if (passwordSchema.validate(req.body.password)) {
      next();
    } else {
      return res.status(401).json({
        message:
          " Ce mot de passe n'est pas valide. trois caractéres au minimun dont une majucule et un chiffre. ",
      });
    }
  };