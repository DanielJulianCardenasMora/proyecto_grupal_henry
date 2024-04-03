const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const { users } = require('../controllers/authentication.controllers')


const soloAdmin = (req, res, next) => {
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return res.redirect('/')
}

function soloPublico (req, res, next) {
    const logueado = revisarCookie(req);
    if(!logueado) return next();
    return res.redirect('/admin')
}

const revisarCookie = (req) => {
    try {
        const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
        // console.log(decodificada);
        const validateUser = users.find(user => user.usuario === decodificada.usuario)
        // console.log(validateUser);
        if(!validateUser){
            return false
        }
        return true        
    } catch{
        return false
    }
}

module.exports = {soloAdmin, soloPublico};