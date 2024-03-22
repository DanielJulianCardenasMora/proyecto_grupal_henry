const { getProductsByName, getProductDetail, createProductDB, productsDataBase, deleteProductDB } = require('../controllers/productsControllers')

const getProducts = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const productsByName = await getProductsByName(name);
            res.status(200).json(productsByName);
        } else {
            const response = await productsDataBase();
            res.status(200).json(response);
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getDetail = async (req, res) => {
    let { id } = req.params;

    try {
        const productDetail = await getProductDetail(id);
        if (productDetail) {
            res.status(200).json(productDetail);
        } else {
            res.status(404).json(`No se encontraron productos con el id: ${id}`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const postProduct = async (req, res) => {

    const { name, description, price, image, stock, genero,category } = req.body;

    try {
        const newProduct = await createProductDB(name, description, price, image, stock, genero, category);
        console.log("Producto creado con exito!", newProduct.dataValues);
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear tu nuevo producto' });
    }
}

const deleteProduct = async (req, res) => {

    let { id } = req.params;

    try {
        const deletedProductCount = await deleteProductDB(id);
        if (deletedProductCount > 0) {
            res.status(200).json(`Producto con ID ${id} eliminado correctamente.`);
        } else {
            res.status(404).json('Producto no encontrado.'); // Si no se encontró el producto o no se pudo eliminar
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error interno al eliminar el producto' });
    }
}

module.exports = {
    getProducts,
    getDetail,
    postProduct,
    deleteProduct
}