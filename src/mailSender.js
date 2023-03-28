const nodemailer = require("nodemailer");

const mailSender = async (name, contact, message) => {
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

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else resolve("email sent");
    });
  });
};

module.exports = mailSender;
