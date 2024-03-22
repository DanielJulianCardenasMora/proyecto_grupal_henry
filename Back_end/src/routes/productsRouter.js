const { Router } = require("express");
const { getProducts, getDetail, deleteProduct, postProduct } = require('../handlers/productsHandlers');

const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getDetail);
productsRouter.post('/create', postProduct);
productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;