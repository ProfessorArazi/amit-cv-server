const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
const validator = require("validator");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send({ message: "listening" });
});

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

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const errors = { name: false, email: false, message: false };

  if (name.trim().length < 2) {
    errors.name = true;
  }
  if (message.trim().length === 0) {
    errors.message = true;
  }
  if (!validator.isEmail(email)) {
    errors.email = true;
  }

  if (errors.name || errors.message) {
    return res
      .status(400)
      .send({ errors, message: "Please fill all the fields" });
  } else if (errors.email) {
    return res.status(400).send({ errors, message: "Please enter valid mail" });
  }

  mailSender(name, email, message);
  res.status(200).send({ message: "Thanks for contact me" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
