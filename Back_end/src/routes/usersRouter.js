const { Router } = require("express");
const { getUsers, postUser, deleteUser } = require('../handlers/usersHandlers');

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/create', postUser);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;