const { Router } = require("express");
const { getProducts, getDetail, deleteProduct, postProduct } = require('../handlers/productsHandlers');
const upload = require('../utils/multerConfig')
const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getDetail);
productsRouter.post('/create', upload.array('images', 5), postProduct);
productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;