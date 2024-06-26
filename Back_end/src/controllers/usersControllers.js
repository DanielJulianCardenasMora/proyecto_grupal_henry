const { where } = require("sequelize");
const { User, Order } = require("../db");

const getAllUsers = async (req, res) => {
    const usersInDB = await User.findAll({
        include: {
            model: Order
        }
    });
    return usersInDB
}


const getUserInfoDB = async (userEmail) => {
    const userInDB = await User.findOne({
        where: {
            email: userEmail
        },
        include: {
            model: Order
        }
    });
    return userInDB
}

const updateUserDB = async (userEmail, userData) => {
    try {
        // Busca el usuario por email
        let user = await User.findOne({ where: { email: userEmail } });

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        // Actualiza los campos del usuario con los nuevos datos
        Object.keys(userData).forEach((key) => {
            user[key] = userData[key];
        });

        // Guarda los cambios en la base de datos
        await user.save();

        return user; // Devuelve el usuario actualizado
    } catch (error) {
        throw error;
    }
};

const deleteUserDB = async (userEmail) => {
    const deleted = User.destroy({
        where: {
            email: userEmail
        }
    });
    return deleted
}

// En tu archivo de controladores de usuarios

module.exports = {
    getAllUsers,
    getUserInfoDB,
    updateUserDB,
    deleteUserDB,
}
