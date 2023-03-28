const nodemailer = require("nodemailer");

const mailSender = (name, contact, message) => {
  const email = process.env.MAIL;
  const transporter = nodemailer.createTransport({
    service: "gmail",
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
  
  
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function (error, info) {
    console.log("send" , info)
    if (error) {
     console.log(error)
    }
  });
};

module.exports = mailSender;
