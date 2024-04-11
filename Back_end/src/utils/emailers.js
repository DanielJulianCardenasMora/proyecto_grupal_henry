const nodemailer = require("nodemailer");
const getEmailTemplate = require("../template/getEmailTemplate");
require("dotenv").config();
const { EMAILER_HOST, EMAILER_PORT, EMAILER_PASSWORD } = require("../config");

const transporter = nodemailer.createTransport({
  host: EMAILER_HOST,
  port: EMAILER_PORT,
  tls: { rejectUnauthorized: false },
  auth: {
    user: EMAILER_USER,
    pass: EMAILER_PASSWORD,
  },
});

const sendMail = async (userCreatedDB) => {
  // Verifica que el objeto userCreatedDB contenga la propiedad 'name'
  if (!userCreatedDB || !userCreatedDB.name) {
    throw new Error(
      "The userCreatedDB object does not have the 'name' property"
    );
  }

  const htmlTemplate = getEmailTemplate(userCreatedDB.name);

  try {
    // Send email
    const info = await transporter.sendMail({
      from: '"Wearfashion" <wemolde@gmail.com>',
      to: userCreatedDB.email,
      subject: `Welcome ${userCreatedDB.name} to Wearfashion`,
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

exports.sendMail = (userCreatedDB) => sendMail(userCreatedDB);
