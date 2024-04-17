const emailer = require("../utils/emailers");



const adminSendEmail = async (req, res) => {
  const data = req.body;

  try {
    ;
    emailer.sendMail(data.user, data.mensaje, data.titulo);
    res.status(200).send("Email enviado con exito")
  } catch (error) {
    ;
    res.status(400).send("Email no enviado")
  }
}



module.exports = {
    adminSendEmail
}