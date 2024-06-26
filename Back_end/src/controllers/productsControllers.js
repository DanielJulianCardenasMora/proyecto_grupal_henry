const { Product, Category } = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');
require('dotenv').config();
const { URL_PRODUCTS } = process.env;
const cloudinary = require('../utils/cloudinaryConfig'); 

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
  if (!size || Object.keys(size).length === 0 || !Object.values(size).some(stock => stock > 0)) {
    ;
    return null;
  }
  if (!name || !description || !price || !genero || !category) {
    ;
    return null;
  }
  const totalStock = Object.values(size).reduce((acc, curr) => acc + parseInt(curr), 0);

  const newProduct = { name, description, price, images, stock: totalStock, genero, category, size };

  try {
    newProduct.images = [images];

    if (totalStock !== stock) {
      stock = totalStock;
    }
    const productCreatedDB = await Product.create(newProduct);

    const categoryName = await Category.findOne({ where: { name: category } });
    
    if (!categoryName) {
      ;
      return null;
    }
    await productCreatedDB.addCategory(categoryName);
    return productCreatedDB;
  } catch (error) {
    ;
    throw new Error('Error al crear el producto en la base de datos.');
  }
};

const updateProductDB = async (id, productData) => {
  try {
  
    let product = await Product.findOne({ where: { id: id } });

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    Object.keys(productData).forEach((key) => {
      product[key] = productData[key];
    });

    await product.save();

    return product; 
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
