const { Router } = require('express');
const { createOrder, deleteOrderDb, getOrderDetail, getAllOrder } = require('../controllers/orderControllers');
const orderRoute = Router();

orderRoute.post('/create', createOrder);
orderRoute.get('/:orderId', getOrderDetail)
orderRoute.delete('/:id', deleteOrderDb);
orderRoute.get('/', getAllOrder)
module.exports = orderRoute;
