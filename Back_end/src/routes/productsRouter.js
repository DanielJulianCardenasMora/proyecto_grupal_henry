const { Router } = require("express");
const { getProducts, getDetail } = require('../handlers/productsHandlers');

const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getDetail);

module.exports = productsRouter;