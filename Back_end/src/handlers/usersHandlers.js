const { getAllUsers, getUserInfoDB, deleteUserDB, updateUserDB } = require("../controllers/usersControllers");
const userValidate = require("../utils/UsersValidation");

const validateFields = (fields) => {
  const validators = {
    name: userValidate,
    email: userValidate,
    password: userValidate,
    phone: userValidate,
    country: userValidate,
    city: userValidate,
  };

  const errors = [];

  Object.keys(fields).forEach((field) => {
    try {
      const fieldValidator = validators[field];
      const fieldValue = fields[field];
      const fieldErrors = fieldValidator(field, fieldValue);
      errors.push(...fieldErrors);
    } catch (error) {
      errors.push(error.message);
    }
  });

  return errors;
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (!users.length) {
      res.status(500).json("aun no hay usuarios registrados");
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    ;
    res.status(500).json({ error: "Error al obtener las usuarios" });
  }
};


const getUserInfo = async (req, res) => {
  let { userEmail } = req.params;
  try {
    const user = await getUserInfoDB(userEmail);

    if (!user) {
      res.status(500).json({ message: "aun no hay usuarios registrados con ese nombre" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    ;
    res.status(500).json({ error: "Error al obtener las usuarios" });
  }
};

const editUser = async (req, res) => {
  let { userEmail } = req.params;
  let userData = req.body;

  try {
    const updatedUser = await updateUserDB(userEmail, userData);
    if (updatedUser) {
      res.status(200).json({ mensaje: "Usuario actualizado correctamente", usuario: updatedUser });
    } else {
      res.status(404).json("Usuario no encontrado.");
    }
  } catch (error) {
    console.error("Error al editar el usuario:", error);
    res.status(500).json({ error: "Error interno al editar el usuario" });
  }
};

const deleteUser = async (req, res) => {
  let { userEmail } = req.params;

  try {
    const deletedUserCount = await deleteUserDB(userEmail);

    if (deletedUserCount > 0) {
      res.status(200).json(`User con email ${userEmail} eliminado correctamente.`);
    } else {
      res.status(404).json("User not found.");
    }
  } catch (error) {
    console.error("Error al eliminar el User:", error);
    res.status(500).json({ error: "Error interno al eliminar el User" });
  }
};

module.exports = {
  getUsers,
  getUserInfo,
  editUser,
  deleteUser
};
