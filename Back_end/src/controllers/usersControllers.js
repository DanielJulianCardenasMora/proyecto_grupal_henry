const { User, Order } = require("../db");

const getAllUsers = async (req, res) => {
    const usersInDB = await User.findAll({
        include: {
            model: Order
        }
    });
    return usersInDB
}

const updateUserDB = async (id, userData) => {
    try {
        // Busca el usuario por ID
        let user = await User.findByPk(id);

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

const deleteUserDB = async (id) => {
    const deleted = User.destroy({
        where: {
            id: id
        }
    });
    return deleted
}

module.exports = {
    getAllUsers,
    updateUserDB,
    deleteUserDB
}
