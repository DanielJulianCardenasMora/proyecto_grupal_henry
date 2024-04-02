const { User, Order } = require("../db");

const getAllUsers = async (req, res) => {
    const usersInDB = await User.findAll({
        include: {
            model: Order
        }
    });
    return usersInDB
}

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
    deleteUserDB
}
