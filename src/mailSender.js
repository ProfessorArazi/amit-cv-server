const sgMail = require("@sendgrid/mail");

const mailSender = (name, contact, message) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const email = process.env.MAIL;
  const me = process.env.ME;

  const msg = {
    to: me,
    from: email,
    subject: "Contact via portfolio",
    html: `<p dir='ltr'>Name of contact : ${name} <br/> 
    Contact email : ${contact} <br/>
    ${message}</p> `,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log("working");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = mailSender;
