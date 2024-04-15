const { Product, Category } = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');
require('dotenv').config();
const { URL_PRODUCTS } = process.env;
const cloudinary = require('../utils/cloudinaryConfig'); // Importa la configuración de Cloudinary
const { getCategory } = require("./categoryControllers");



// const getProducts = async () => {
//   try {
//     const response = await axios.get(`${URL_PRODUCTS}`);
//     const categories = await getCategory();


//     const getInfo = response.data.map((element) => {
//       const category = categories.find(cat => cat.name === element.category);

//       return {
//         name: element.name,
//         images: Array.isArray(element.images) ? element.images : [element.images],
//         description: element.description,
//         price: element.price,
//         stock: element.stock,
//         genero: element.genero,
//         category: category ? category.name : null,
//         quantity: 1
//       };
//     });
//     return getInfo;
//   } catch (error) {
//     console.error("Error al obtener productos:", error);
//     throw error;
//   }
// };

const productsDataBase = async () => {
  try {
    // const productsApi = await getProducts();

    // for (const product of productsApi) {
    //   const category = await Category.findOne({ where: { name: product.category } });
    //   if (category) {
    //     product.category = category.name;
    //   }
    // }

    const existingProducts = await Product.findAll({
      include: [{
        model: Category,
        attributes: ["name"],
        through: { attributes: [] },
      }],
    });
    return existingProducts;
    // if (!existingProducts.length) {
    //   const createdProducts = await Product.bulkCreate();
    //   return createdProducts;
    // } else {
    //   return existingProducts;
    // }
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
  if (!size || Object.keys(size).length === 0) {
    size = {};
  }
  const newProduct = { name, description, price, stock, genero, category, size };
  try {
    newProduct.images = [images];

    const totalStock = Object.values(size).reduce((acc, curr) => acc + curr, 0);
    if (totalStock !== stock){
      console.log('El stock total de los tamanos no coincide al stock global.');
      stock= totalStock;
    }
      const productCreatedDB = await Product.create(newProduct);


    const categoryName = await Category.findOne({ where: { name: category } });
    if (!categoryName) {
      console.log("La categoría especificada no existe.");
      return null;
    }
    await productCreatedDB.addCategory(categoryName);
    console.log("Nombre de la categoría encontrada:", categoryName.name);

    return productCreatedDB;
  } catch (error) {
    console.log(error);
    throw new Error('Error al crear el producto en la base de datos.');
  }
};

const updateProductDB = async(id, productData) => {
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
