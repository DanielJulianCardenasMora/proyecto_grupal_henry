const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User, Order } = require('../db')

dotenv.config();

const register = async ( req, res ) => {
    const { name, email, password, phone, country, city } = req.body;

    if (!name || !email || !password || !phone || !country || !city){
        return res.status(404).send({status: "Error", message: "Los campos estan incompletos" })
    }

    // Funcion que revisa si el name ingresado ya existe en la base de datos:
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
        return res.status(400).send({ status: "Error", message: `El email ${email} ya está en uso` });
    }
    
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt)
    const newUser = { name, email, password: hashPassword, phone, country, city }

    //agregar usuario a Base de Datos 
    try {
        const userCreatedDB = await User.create(newUser);
        console.log(`usuario: ${userCreatedDB.name} creado! `);
        return res.status(201).send({status: "ok", message: `email ${newUser.email} registrado correctamente en la base de datos`, redirect:'/login'})
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "Error", message: "Error al registrar el usuario" });
    }
}

const login = async (req, res) => {
    // console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);

    if(!email || !password){
        return res.status(400).send({status: "Error", message: "Los campos estan incompletos!"})
    }

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email: email } });
    
    if(!user){
        return res.status(400).send({status: "Error", message: "Email no encontrado" })
    }

    // Verificar la contraseña
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send({ status: "Error", message: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jsonwebtoken.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );    
    
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: '/login'
    }

    //Enviar la cookie con el token
    res.cookie("jwt", token, cookieOption);
    
    //Enviar respuesta al usuario
    res.send({status: "ok", message: `usuario con email ${email} registrado correctamente`, redirect:"/admin"})
}

module.exports = {
    login,
    register
}