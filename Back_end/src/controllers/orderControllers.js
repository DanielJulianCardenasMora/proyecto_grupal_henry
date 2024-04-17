const { Order, User, OrderDetail, Product } = require('../db')


const modifictProductStock = async (productId, quantity, size) => {
    try {
        const existingProduct = await Product.findByPk(productId);
        if (!existingProduct) {
            throw new Error({ error: `El producto con ID ${productId} no existe` })
        }

        const totalStockSize = Object.values(size).reduce((acc, curr) => acc + parseInt(curr), 0)
        if (existingProduct.stock < quantity || existingProduct.stock < totalStockSize) {
            throw new Error({ error: `No hay suficiente stock disponible para el producto ${existingProduct.name} .` })
        }

        existingProduct.stock -= quantity;
        for (const [sizeKey, sizeStock] of Object.entries(size)) {
            if (existingProduct.size[sizeKey] < sizeStock) {
                throw new Error({ error: `No hay suficiente stock disponible para la talla ${sizeKey} del producto ${existingProduct.name}` })
            }
            existingProduct.size[sizeKey] -= sizeStock;
        }
        await existingProduct.save();  
    } catch (error) {
        console.error('No se pudo actualizar el stock en la Base de Datos:', error);
        throw error;
    }
}

const createOrder = async (req, res) => {
    try {
        const { userId, email, nameUser, products, detalle } = req.body;

        if (!userId || !products) {
            throw new Error('El UserID o los Productos no son enviados en el cuerpo de la solicitud.');
        }

        const newOrder = await Order.create({
            detalle: detalle,
            UserId: userId,
            email, email,
            nameUser: nameUser
        });

        for (const product of products) {
            const { productId, quantity, name, price, size } = product;

            const formattedSize = Object.keys(size)
                .sort()
                .map(key => `${size[key]}:${key}`)
                .join(',');

            let existeProduct = await OrderDetail.findOne({
                where: {
                    OrderId: newOrder.id,
                    ProductId: productId,
                    name: name
                }
            });
            if (existeProduct) {
                existeProduct.quantity += quantity;
                if (!existeProduct.size.includes(formattedSize)) {
                    existeProduct.size += `, ${formattedSize}`;
                }
                await existeProduct.save();
            } else {
                await OrderDetail.create({
                    OrderId: newOrder.id,
                    ProductId: productId,
                    quantity: quantity,
                    name: name,
                    price: price,
                    size: formattedSize
                })
            }

       
            await modifictProductStock(productId, quantity, size);
        }
        await newOrder.setUser(userId);
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
    try {
        const deletedOrderCount = await Order.destroy({
            where: {
                id: id
            }
        });
        return deletedOrderCount;
    } catch (error) {
        console.error('Error al eliminar la orden de la base de datos:', error);
        throw error;
    }
}

const getOrderDetail = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const orderDetail = await OrderDetail.findAll({
            where: {
                OrderId: orderId
            }
        })
        ;
        res.status(200).send(orderDetail)
    } catch (error) {
        console.error('Error al obtener los detalles de la orden:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
}
module.exports = { createOrder, getAllOrder, deleteOrderDb, getOrderDetail }
