const { Router } = require('express');
const { getOrder, postOrder, deleteOrder } = require('../handlers/orderHandler');
const { getAllOrder, createOrder, deleteOrderDb, getOrderDetail } = require('../controllers/orderControllers');


const orderRoute = Router();

orderRoute.get('/', getAllOrder);
orderRoute.post('/create', createOrder);
orderRoute.delete('/:id', deleteOrderDb);
orderRoute.get('/:orderId', getOrderDetail)

module.exports = orderRoute;
