const nodemailer = require("nodemailer");

const mailSender = (name, contact, message) => {
  const email = process.env.MAIL;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: email,
      pass: process.env.PASS,
    },
  });

  const me = process.env.ME;

  const mailOptions = {
    from: email,
    to: me,
    subject: "Contact via portfolio",
    html: `<p dir='ltr'>Name of contact : ${name} <br/> 
    Contact email : ${contact} <br/>
    ${message}</p> `,
  };

  try {
    transporter.sendMail(mailOptions, function (error, info) {
      console.log("sending mail...");
      if (error) {
        console.log(error);
      }
      console.log(info);
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = mailSender;
