const { Router } = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoryRouter = require('./categoryRuter');
const orderRouter = require('../routes/orderRoute');
const { getOrder } = require('../handlers/orderHandler');
const { getAllOrder } = require('../controllers/orderControllers');

const router = Router();

router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/category', categoryRouter)
router.use('/orders', orderRouter)

module.exports = router;