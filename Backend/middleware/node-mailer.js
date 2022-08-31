const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "office365.com",
  port: 587,
  secure: false,
  ssl: true,
  auth: {
    user: process.env.officeMail,
    pass: process.env.officePass,
  },
});




exports.infoConnection = function (req, res, next) {
  transporter.sendMail(
    {
      from: `${process.env.officeMail}`,
      to: `${process.env.officeMail}`,
      subject: "Information enregistrement",
      text: `essai`,
      html: "<p>HTML version of the message</p>",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent : " + info.response);
      }
    }
  );
  next();
};
