const { Router } = require('express');
const { createOrder, deleteOrderDb, getOrderDetail } = require('../controllers/orderControllers');
const orderRoute = Router();

orderRoute.post('/create', createOrder);
orderRoute.get('/:orderId', getOrderDetail)
orderRoute.delete('/:id', deleteOrderDb);

module.exports = orderRoute;
