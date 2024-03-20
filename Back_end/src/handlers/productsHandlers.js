const { getProductsByName, getProductDetail ,productsDataBase} = require('../controllers/productsControllers')

const getProducts = async (req, res) => {
    const { name } = req.query;
    try {
        if(name){
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
            res.status(404).send(`No se encontraron productos con el id: ${id}`);
        }
    } catch (error) {
        console.error('Error al obtener el detalle del producto elegido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getProducts,
    getDetail
}