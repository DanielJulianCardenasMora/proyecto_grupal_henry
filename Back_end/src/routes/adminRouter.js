const { Router } = require('express');
const { postProduct, deleteProduct, productActivation } = require('./../handlers/productsHandlers')
const { getUsers, getUserInfo, deleteUser } = require('./../handlers/usersHandlers')
const { getOrder } = require('./../handlers/orderHandler')
const upload = require('../utils/multerConfig')
const adminRouter = Router();

// Rutas para Productos 
adminRouter.post('/create', upload, postProduct); // crear producto
adminRouter.put('/product-active/:id/activate', productActivation); // activar/desactivar producto
adminRouter.delete('/delete-product/:id', deleteProduct); // eliminar producto pasado por id

// Rutas para Usuarios
adminRouter.get('/users-list', getUsers); // obtener listado de usuarios
adminRouter.get('/users-info/:userEmail', getUserInfo); // obterner informacion de usuario con ese email
adminRouter.delete('/delete-users/:userEmail', deleteUser); // eliminar usuario con ese email

// Rutas para Ordenes
adminRouter.get('/orders', getOrder); // Obtener todas las ordenes creadas por usuarios

module.exports = adminRouter;