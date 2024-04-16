const nodemailer = require("nodemailer");
const getEmailTemplate = require("../template/getEmailTemplate");
require("dotenv").config();

const {
  EMAILER_HOST,
  EMAILER_PORT,
  EMAILER_PASSWORD,
  EMAILER_USER,
} = require("../../config");

const transporter = nodemailer.createTransport({
  host: EMAILER_HOST,
  port: EMAILER_PORT,
  tls: { rejectUnauthorized: false },
  auth: {
    user: "dominicano3d@gmail.com",
    pass: EMAILER_PASSWORD,
  },
});

const sendMail = (userCreatedDB) => {
  const htmlTemplate = getEmailTemplate(userCreatedDB.name);
  console.log("Recipient's Email:", userCreatedDB.email);

  const mailOptions = {
    from: '"Wearfashion" <wemolde@gmail.com>',
    to: userCreatedDB.email,
    subject: `Welcome ${userCreatedDB.name} to Wearfashion`,
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error Sending mail", error);
    } else {
      console.log("Recipient's Email:", userCreatedDB.email);
    }
  });
};

exports.sendMail = (userCreatedDB) => sendMail(userCreatedDB);
