const express = require("express");
const app = express();
const validator = require("validator");
const mailSender = require("./src/mailSender");

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const errors = { name: false, email: false, message: false };

  if (name.trim().length === 0) {
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
