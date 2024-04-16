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

const sendMail = (user, mensaje, titulo) => {
  const htmlTemplate = getEmailTemplate(user, mensaje, titulo);
  console.log("Recipient's Email:", user);

  const mailOptions = {
    from: '"Wearfashion" <wemolde@gmail.com>',
    to: user,
    subject: `Welcome ${user} to Wearfashion`,
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error Sending mail", error);
    } else {
      console.log("Recipient's Email:", user.email);
    }
  });
};

exports.sendMail = (user, mensaje, titulo) => sendMail(user, mensaje, titulo);
