const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const { User } = require('../db')
// const { users } = require('../controllers/authentication.controllers')


const soloAdmin = async (req, res, next) => {
    try {
        // ;
        // Verifica si el usuario esta autenticado y tiene rol de administrador
        const { user, role } = await revisarCookie(req);
        ;
        if (role === 'admin') {
            return next();
        } else {
            return res.status(403).send({status: 'Error', message: 'Unauthorized access'})
        }
    } catch (error) {
            ;
            return res.status(404).send({status: 'Error', message: error})
    }
}

function soloPublico(req, res, next) {
    try {
        // Verifica si el usuario esta autenticado
        const logueado = revisarCookie(req);
        if (logueado && logueado.role === 'user') {
            return next();
        } else {
            return res.status(403).send({status: 'Error', message: 'Unauthorized access'})
        }
    } catch (error) {
            ;
            return res.status(404).send({status: 'Error', message: error})
    }
}

const revisarCookie = async(req) => {
    try {

        if (!req.headers.cookie) {
            throw new Error('No se proporcionó ninguna cookie en la solicitud');
        }

        const cookieJWT = req.headers.cookie.slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
        const user = await User.findByPk(decodificada.user.id);

        return {user, role: user.role};
    } catch (error) {
        ;
        ;
        return null
    }
}

module.exports = { soloAdmin, soloPublico };