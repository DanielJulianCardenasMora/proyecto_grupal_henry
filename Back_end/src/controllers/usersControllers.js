const { User, Order } = require("../db");


const getAllUsers = async (req, res) => {
    const usersInDB = await User.findAll({
        include: {
            model: Order
        }
    });
    return usersInDB
}

const createUserDB = async (name, email, password, phone, country, city) => {
    const user = { name, email, password, phone, country, city }
    try {
        const userCreatedDB = await User.create(user);
        console.log(`usuario creado! ${userCreatedDB}`);
        return userCreatedDB
    } catch (error) {
        console.log(error);
    }
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
    createUserDB,
    deleteUserDB
}
