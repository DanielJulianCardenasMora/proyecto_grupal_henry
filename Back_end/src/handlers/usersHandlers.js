const {createUserDB, getAllUsers} = require('../controllers/usersControllers')

const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        if(!users.length){
            res.status(500).json("aun no hay usuarios registrados")
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        console.log('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener las usuarios' });
    }
}

const postUser = async (req, res) => {
    const { name, email, password, phone, country, city } = req.body;

    try {
        const newUser = await createUserDB( name, email, password, phone, country, city  );
        console.log("Usuario creado con exito!", newUser, name);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear tu nuevo usuario' });
    }
}

module.exports = {
    getUsers,
    postUser
}