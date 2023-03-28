const nodemailer = require("nodemailer");

const mailSender = (name, contact, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  const email = process.env.MAIL;
  const me = process.env.ME;

  const mailOptions = {
    from: email,
    to: me,
    subject: "Contact via portfolio",
    html: `<p dir='ltr'>Name of contact : ${name} <br/> 
    Contact email : ${contact} <br/>
    ${message}</p> `,
  };
  

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(info);
    if (error) {
      throw new Error(error);
    }
  });
};

module.exports = mailSender;
