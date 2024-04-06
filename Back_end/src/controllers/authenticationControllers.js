const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User, Order } = require("../db");
const emailer = require("../utils/emailers");

dotenv.config();


const register = async (req, res) => {
  // const { name, email, password, phone, country, city } = req.body;
  const { email, password, phone, country } = req.body;
  // if (!name || !email || !password || !phone || !country || !city) {
  if ( !email || !password || !phone || !country ) {
    return res
      .status(404)
      .send({ status: "Error", message: "Los campos estan incompletos" });
  }

  // Funcion que revisa si el name ingresado ya existe en la base de datos:
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    return res
      .status(400)
      .send({ status: "Error", message: `El email ${email} ya está en uso` });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  // const newUser = { name, email, password: hashPassword, phone, country, city };
  const newUser = { email, password: hashPassword, phone, country };

  //agregar usuario a Base de Datos
  try {
    const userCreatedDB = await User.create(newUser);
    emailer.sendMail(userCreatedDB);
    return res.status(201).send({
      status: "ok",
      message: `El email ${userCreatedDB.email} se ha registrado correctamente! `,
      redirect: "/login",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: "Error", message: "Error al crear el usuario" });
  }
};

const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    if (!email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos estan incompletos!" });
  }

const user = await User.findOne({ where: { email: email } });

if (!user) {
    return res
      .status(400)
      .send({ status: "Error", message: "Email no encontrado" });
  }
  // Verificar la contraseña
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .send({ status: "Error", message: "Contraseña incorrecta" });
  }

  //   // Generar el token JWT
  // const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRATION,
  // });

  // const cookieOption = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
  //   ),
  //   path: "/login",
  // };

  // //Enviar la cookie con el token
  // res.cookie("jwt", token, cookieOption);

  // //Enviar respuesta al usuario
  // res.send({ status: "ok", message: "usuario loggeado", redirect: "/admin" });

  } catch (error) {
    console.log("Ocurrio un error:", error);
    return res.status(500).send(error)
  }
};

module.exports = {
  login,
  register,
};