const { Router } = require("express");
const { getUsers, postUser } = require('../handlers/usersHandlers');

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', postUser);

module.exports = usersRouter;