const { User } = require("../db");

const getAllUsers = async (req, res) => {
    const usersInDB = await User.findAll();



    return usersInDB
}

const createUserDB = async ( name, email, password, phone, country, city ) => {
    const user = {name, email, password, phone, country, city }
    try {
        const userCreatedDB = await User.create(user);
        console.log(`usuario creado! ${userCreatedDB}`);
        return userCreatedDB
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllUsers,
    createUserDB
}
