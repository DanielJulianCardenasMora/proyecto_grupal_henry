const { where } = require('sequelize');
const { Order, User, OrderDetail, Product } = require('../db')
const Sequelize = require('sequelize');

const modifictProductStock = async (productId, quantity) => {
    try {
        const existingProduct = await Product.findByPk(productId);
        if (!existingProduct) {
            throw new Error({ error: `El producto con ID ${productId} no existe` })
        }

        //verifico si hay stock del producto
        if (existingProduct.stock < quantity) {
            throw new Error({ error: `No hay suficiente stock disponible para el producto ${existingProduct.name} .` })
        }

        existingProduct.stock -= quantity;
        await existingProduct.save();    //save se usa para actualizar el stock en la bd. 
    } catch (error) {
        console.error('No se pudo actualizar el stock en la Base de Datos:', error);
        throw error;
    }
}
const createOrder = async (req, res) => {
    try {
        const { userId, products, detalle } = req.body;
    
        console.log('products', products);
        const newOrder = await Order.create({
            detalle: detalle,
            UserID: userId
        });
        console.log("Nueva orden creada:", newOrder);

        //itera sobre el product y agrega al carrito
        for (const product of products) {
            const { productId, quantity, name, price } = product;

            console.log("Agregando producto a la orden:", productId, quantity, name, price);

            await modifictProductStock(productId, quantity);

            //detalle de la orden
            await OrderDetail.create({
                OrderId: newOrder.id,
                ProductId: productId,
                quantity: quantity,
                name: name,
                price: price    //size: size en el caso que le agregemos talles
            })
            console.log("Producto agregado a la orden:", productId, quantity);

        }
        await newOrder.setUser(userId);
        console.log("Orden asociada al usuario:", userId);
        res.status(200).send(newOrder);
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

const getOrderDetail = async (req, res) => {
    try {
        const orderId = req.params.orderId;
       
        const orderDetail = await OrderDetail.findAll({
            where: {
                OrderId: orderId
            }
        })
        console.log('orderDetail:', orderDetail);
        res.status(200).send(orderDetail)
    } catch (error) {
        console.error('Error al obtener los detalles de la orden:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
}
module.exports = { createOrder, getAllOrder, deleteOrderDb, getOrderDetail }