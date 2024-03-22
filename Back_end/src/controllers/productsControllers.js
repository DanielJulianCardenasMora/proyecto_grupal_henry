const { Product, Category } = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');

const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://wearfashion-947fb-default-rtdb.firebaseio.com/products/products.json"
    );
    const getInfo = response.data.map((element) => {
      return {
        // id: element.id,
        name: element.name,
        image: element.image,
        description: element.description,
        price: element.price,
        stock: element.stock,
        genero: element.genero,
        category: element.category
      };
    });
    return getInfo;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

const productsDataBase = async (page = 1, pageSize = 5) => {
  try {
    const productsApi = await getProducts();

    //const offset = (page - 1) * pageSize;     //determino donde comienza la pagina y du tamaño

    const existingProducts = await Product.findAll({
      include: [Category]
      // include: [{
      //   model: Category,
      //   attributes: ["name"],
      //   through: { attributes: [] },
      // }],
      // limit: pageSize,
      // offset: offset
    });
    // console.log('Productos existentes en la base de datos:', existingProducts); // Registro de productos existentes en la base de dato
    if (!existingProducts.length) {
      const createdProducts = await Product.bulkCreate(productsApi);
      //console.log('Productos creados en la base de datos:', createdProducts); // Registro de los productos creados en la base de datos
      return createdProducts;
    } else {
      return existingProducts;
    }
  } catch (error) {
    console.error(
      "Error al procesar los productos en la base de datos:",
      error
    );
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
    return productFiltered;
  } catch (error) {
    console.error('Error fetching or processing country data:', error);
    throw error;
  }
};

const createProductDB = async (name, description, price, image, stock, genero,category) => {
  const newProduct = { name, description, price, image, stock, genero,category }
  try {
    const productCreatedDB = await Product.create(newProduct);

    await productCreatedDB.addCategory(category);

    return productCreatedDB
  } catch (error) {
    console.log(error);
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
  deleteProductDB
};
