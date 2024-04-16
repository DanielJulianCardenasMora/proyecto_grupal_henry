const emailer = require("../utils/emailers");



const adminSendEmail = async (req, res) => {
  const data = req.body;

  try {
    console.log(data);
    emailer.sendMail(data.user, data.mensaje, data.titulo);
    res.status(200).send("Email enviado con exito")
  } catch (error) {
    console.log(error);
    res.status(400).send("Email no enviado")
  }
}



module.exports = {
    adminSendEmail
}