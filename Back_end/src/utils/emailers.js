// const nodemailer = require("nodemailer");
// const { User, Order } = require("../db");
// const getEmailTemplate = require("../template/getEmailTemplate");
// const createTrans = () => {
//   const transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "f6a91bab298409",
//       pass: "5a55c3a8b0c443",
//     },
//   });
//   return transport;
// };
// const sendMail = async (userCreatedDB) => {
//   const transporter = createTrans();
//   const htmltemplate = getEmailTemplate(userCreatedDB.name);
//   const info = await transporter.sendMail({
//     from: '"Wearfashion" <wemolde@gmail.com>',
//     to: `${userCreatedDB.email}`,
//     subject: `Hola ${userCreatedDB.name} Welcome to Wearfashion`,
//     html: htmltemplate,
//   });
//   console.log("Message sent:%s", info.messageId);
// };

// exports.sendMail = (userCreatedDB) => sendMail(userCreatedDB);
