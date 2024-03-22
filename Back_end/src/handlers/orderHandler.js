const { createOrder, getAllOrder, deleteOrderDb } = require('../controllers/orderControllers');

const getOrder = async (req, res) => {
    try {
        const responseOrder = await getAllOrder();
        if(!responseOrder.length){
            res.status(500).json("aun no hay usuarios registrados")
        } else {
            res.status(200).send(responseOrder);
        }
    } catch (error) {
        console.log('Error al solicitar la order');
        res.status(500).json({ error: error.message });
    }
}

const postOrder = async (req, res) => {

    const { detalle } = req.body;

    try {
        const newOrder = await createOrder({ userId, detalle });

        res.status(201).json(newOrder);
    } catch (error) {
        console.log('Error al crear la order');
        res.status(500).json({ error: error.message });
    }
}

const deleteOrder = async (req, res) => {
    let { id } = req.params;

    try {
        const deleteOrder = await deleteOrderDb(id);
        if (deleteOrder > 0) {
            res.status(200).json(`Order con ID ${id} eliminado correctamente.`);
        } else {
            res.status(404).json('Order no encontrada.'); // Si no se encontró el producto o no se pudo eliminar
        }
    } catch (error) {
        console.error('Error al eliminar el order');
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getOrder,
    postOrder,
    deleteOrder
}