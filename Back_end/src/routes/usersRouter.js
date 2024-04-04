const { Router } = require("express");
const { getUsers, deleteUser, editUser } = require('../handlers/usersHandlers');
const { register, login } = require('../controllers/authenticationControllers')

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/api/register', register);
usersRouter.post('/api/login', login);
usersRouter.put('/:id', editUser);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;