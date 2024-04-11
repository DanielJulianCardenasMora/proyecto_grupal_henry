const nodemailer = require("nodemailer");
const getEmailTemplate = require("../template/getEmailTemplate");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  tls: { rejectUnauthorized: false },
  auth: {
    user: "marty.hauck19@ethereal.email",
    pass: "Gf57EeZ1PDTeHCPrS7",
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
