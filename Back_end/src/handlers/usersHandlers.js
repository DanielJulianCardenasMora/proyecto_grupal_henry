const {
  createUserDB,
  getAllUsers,
  deleteUserDB,
} = require("../controllers/usersControllers");
const { User } = require("../db");
const userValidate = require("../utils/UsersValidation");
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (!users.length) {
      res.status(500).json("aun no hay usuarios registrados");
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    console.log("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener las usuarios" });
  }
};
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
const postUser = async (req, res) => {
  const { name, email, password, phone, country, city } = req.body;

  // Perform validations
  const errors = validateFields({
    name,
    email,
    password,
    phone,
    country,
    city,
  });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const newUser = await createUserDB(
      name,
      email,
      password,
      phone,
      country,
      city
    );
    console.log("Usuario creado con éxito!", newUser, name);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear tu nuevo usuario" });
  }
};

const deleteUser = async (req, res) => {
  let { id } = req.params;

  try {
    const deletedUserCount = await deleteUserDB(id);

    if (deletedUserCount > 0) {
      res.status(200).send(`User con ID ${id} eliminado correctamente.`);
    } else {
      res.status(404).send("User no encontrado.");
    }
  } catch (error) {
    console.error("Error al eliminar el User:", error);
    res.status(500).json({ error: "Error interno al eliminar el User" });
  }
};

module.exports = {
  getUsers,
  postUser,
  deleteUser,
};
