const { Router } = require("express");
const { getUsers, getUserInfo, deleteUser, editUser } = require('../handlers/usersHandlers');
const { register, login } = require('../controllers/authenticationControllers')

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userEmail', getUserInfo);
usersRouter.post('/api/register', register);
usersRouter.post('/api/login', login);
usersRouter.put('/:userEmail', editUser);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;