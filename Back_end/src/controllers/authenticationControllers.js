const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User, Order } = require("../db");
const emailer = require("../utils/emailers");

dotenv.config();

const register = async (req, res) => {
  const { name, email, password, phone, country } = req.body;

  if (!name || !email || !password || !phone || !country) {
    return res
      .status(404)
      .send({ status: "Error", message: "Fields are incomplete" });
  }

  // Check if the entered email already exists in the database:
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    return res.status(400).send({
      status: "Error",
      message: `The email ${email} is already in use`,
    });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  const newUser = { name, email, password: hashPassword, phone, country };

  // Add user to the Database
  try {
    const userCreatedDB = await User.create(newUser);
    emailer.sendMail(userCreatedDB);
    return res.status(201).send({
      status: "ok",
      message: `The email ${userCreatedDB.email} has been registered successfully! `,
      redirect: "/login",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: "Error", message: "Error creating the user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: "Error", message: "Fields are incomplete!" });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(400)
        .send({ status: "Error", message: "Email not found" });
    }

    // Verify the password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ status: "Error", message: "Incorrect password" });
    }

    res.send({ status: "ok", message: "User logged in" });
  } catch (error) {
    console.log("An error occurred:", error);
    return res.status(500).send(error);
  }
};

module.exports = {
  login,
  register,
};
