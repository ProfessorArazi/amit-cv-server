const nodemailer = require("nodemailer");

const mailSender = (name, contact, message) => {
  const email = "ameatrest@gmail.com";
  const me = "amitarazi12345@gmail.com";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: "Amit1122",
    },
  });

  const mailOptions = {
    from: email,
    to: me,
    subject: "Contact via portfolio",
    html: `<p dir='ltr'>Name of contact : ${name} <br/> 
    Contact email : ${contact} <br/>
    ${message}</p> `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = mailSender;
