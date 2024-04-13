const nodemailer = require("nodemailer");
const getEmailTemplate = require("../template/getEmailTemplate");
require("dotenv").config();
const {
  EMAILER_HOST,
  EMAILER_PORT,
  EMAILER_PASSWORD,
  EMAILER_USER,
} = require("../../config");

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9ede3aa5a49668",
    pass: "084fd839089276",
  },
});

const sendMail = async (userCreatedDB) => {
  // Verifica que el objeto userCreatedDB contenga la propiedad 'name'

  console.log(
    "Preparando para enviar el correo electrónico a:",
    userCreatedDB.email
  );

  const htmlTemplate = getEmailTemplate(userCreatedDB.name);

  try {
    // Send email
    const info = await transporter.sendMail({
      from: '"Wearfashion" <wemolde@gmail.com>',
      to: userCreatedDB.email,
      subject: `Welcome ${userCreatedDB.name} to Wearfashion`,
      html: htmlTemplate,
    });

    console.log("Correo electrónico enviado con éxito:", info);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
};

exports.sendMail = (userCreatedDB) => sendMail(userCreatedDB);
