const { Router } = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoryRouter = require('./categoryRuter');
const router = Router();

router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/category', categoryRouter)

module.exports = router;