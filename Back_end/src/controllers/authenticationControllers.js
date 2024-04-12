const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User, Order } = require("../db");
// const emailer = require("../utils/emailers");

dotenv.config();

const register = async (req, res) => {
  const { email, password, phone, country, role } = req.body;

  if (!email || !password || !phone || !country) {
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
  const newUser = { email, password: hashPassword, phone, country, role };

  try {
    // Create the user in the database
    const userCreatedDB = await User.create(newUser);

    // Generate token for the new user
    const dataUser = { user: { id: userCreatedDB.id } }
    const token = jwt.sign(dataUser, `${process.env.JWT_SECRET}`, { expiresIn: 3600 })

    // Update the user with the generated token
    await User.update({ token: token }, { where: { id: userCreatedDB.id } });

    return res.status(201).send({
      status: "ok",
      message: `The email ${userCreatedDB.email} has been registered successfully! `
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

    // console.log(user.token);
    // console.log(user.role);

    if (!user) {
      return res
        .status(400)
        .send({ status: "Error", message: "Email not found" });
    }

    // Verify the password
    const isMatch = await bcryptjs.compare(password, user.password);

    // If there is a wrong password
    if (!isMatch) {
      return res
        .status(400)
        .send({ status: "Error", message: "Incorrect password" });
    }

    // If password is correct, we generate the token
    const dataUser = { user: { id: user.id } }
    const token = jwt.sign(dataUser, `${process.env.JWT_SECRET}`, { expiresIn: 3600 })
    
    const cookieOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      )
    }

    // We configure the new cookie wtih the JWT token
    res.cookie("jwt", token, cookieOption);

    // If there is a correct login, return the token
    res.send({ status: "ok", message: "User logged in", role: user.role });
  } catch (error) {
    console.log("An error occurred:", error);
    return res.status(500).send(error);
  }
};

module.exports = {
  login,
  register,
};
