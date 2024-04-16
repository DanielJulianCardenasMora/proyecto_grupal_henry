const { Product, Category } = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');
require('dotenv').config();
const { URL_PRODUCTS } = process.env;
const cloudinary = require('../utils/cloudinaryConfig'); // Importa la configuración de Cloudinary
const { getCategory } = require("./categoryControllers");

const productsDataBase = async () => {
  try {
    const existingProducts = await Product.findAll({
      include: [{
        model: Category,
        attributes: ["name"],
        through: { attributes: [] },
      }],
    });
    return existingProducts;
  } catch (error) {
    console.error("Error al procesar los productos en la base de datos:", error);
    throw error;
  }
};

const getProductDetail = async (id) => {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return null
    }

    return product;
  } catch (error) {
    console.error("Error al obtener el detalle del producto:", error);
    throw error;
  }
};

const getProductsByName = async (name) => {
  try {
    const productFiltered = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });

    // Verifica si se encontraron productos
    if (!productFiltered || productFiltered.length === 0) {
      return []; // Devuelve un array vacío si no se encontraron productos
    }

    return productFiltered; // Devuelve el array de productos filtrados
  } catch (error) {
    console.error('Error fetching or processing product data:', error);
    throw error;
  }
};

const createProductDB = async (name, description, price, images, stock, genero, category, size) => {
  // if (!Array.isArray(size) || size.length === 0 || !size.some(item => item.stock > 0)) {
  //   console.log('Debe proporcionar al menos un tamaño con un stock definido para crear el producto.');
  //   return null;
  // }
  // Suponiendo que "sizeData" es el array que recibes en el backend
  if (!name || !description || !price || !genero || !category) {
    console.log('Faltan propiedades requeridas para crear el producto.');
    return null;
  }
  const totalStock = size.reduce((acc, curr) => acc + parseInt(curr.stock), 0);

  const newSizeArray = size.map(item => ({
    size: item.size,
    stock: parseInt(item.stock)
  }));
  const newSizeArrayJSON = JSON.stringify(newSizeArray);
  const newProduct = { name, description, price, images, stock: totalStock, genero, category, size:newSizeArrayJSON  };
  console.log('NewProduct', newProduct);
  try {
    newProduct.images = [images];

    if (totalStock !== stock) {
      stock = totalStock;
    }
    const productCreatedDB = await Product.create(newProduct);

    const categoryName = await Category.findOne({ where: { name: category } });

    if (!categoryName) {
      console.log("La categoría especificada no existe.");
      return null;
    }
    await productCreatedDB.addCategory(categoryName);


    return productCreatedDB;
  } catch (error) {
    console.log(error);
    throw new Error('Error al crear el producto en la base de datos.');
  }
};

const updateProductDB = async (id, productData) => {
  try {
    // Busca el producto por id
    let product = await Product.findOne({ where: { id: id } });

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    // Actualiza los campos del producto con los nuevos datos
    Object.keys(productData).forEach((key) => {
      product[key] = productData[key];
    });

    // Guarda los cambios en la base de datos
    await product.save();

    return product; // Devuelve el producto actualizado
  } catch (error) {
    throw error;
  }
}

const deleteProductDB = async (id) => {
  const productDeleted = Product.destroy({
    where: {
      id: id
    }
  });
  return productDeleted
}

module.exports = {
  productsDataBase,
  getProductDetail,
  getProductsByName,
  createProductDB,
  deleteProductDB,
  updateProductDB
};





