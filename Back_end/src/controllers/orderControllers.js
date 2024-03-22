const { Order, User } = require('../db')

const createOrder = async (req, res) => {
    try {
        const { userId, detalle } = req.body;

        const newOrder = await Order.create({ detalle })

        const order = await newOrder.setUser(userId);

        res.status(200).send(order);
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(400).json({ error: error.message });
    }
}
const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
};
const deleteOrderDb = async (id) => {
    const deleteOrder = Order.destroy({
        where: {
            id: id
        }
    });
    return deleteOrder;
}
module.exports = { createOrder, getAllOrder, deleteOrderDb }