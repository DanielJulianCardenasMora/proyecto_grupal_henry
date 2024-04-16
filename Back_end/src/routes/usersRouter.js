const { Router } = require("express");
const { editUser } = require('../handlers/usersHandlers');
const { register, login } = require('../controllers/authenticationControllers');
const { deactivateUser, activateUser } = require("../controllers/usersControllers");
const usersRouter = Router();

usersRouter.post('/api/register', register);
usersRouter.post('/api/login', login);
usersRouter.put('/:userEmail', editUser);
usersRouter.put('/activate/:userEmail', activateUser);
usersRouter.put('/deactivate/:userEmail', deactivateUser);

module.exports = usersRouter;