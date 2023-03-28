const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
const validator = require("validator");
const mailSender = require("./src/mailSender");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send({ message: "listening" });
});

app.post("/contact",async (req, res) => {
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

 await mailSender(name, email, message);
  res.status(200).send({ message: "Thanks for contact me" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
