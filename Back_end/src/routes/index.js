const { Router } = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoryRouter = require('./categoryRuter');
const orderRouter = require('../routes/orderRoute');
//hola
const router = Router();

router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/category', categoryRouter)
router.use('/orders', orderRouter)

router.post('/carrito/comprar', async (req, res) => {
    console.log(req.body);
    if (req.body && req.body.length > 0) {
        return res.sendStatus(200)
    }
    res.sendStatus(400)
})


module.exports = router;