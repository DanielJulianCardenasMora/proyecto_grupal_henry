const { Product } = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');

const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://wearfashion-947fb-default-rtdb.firebaseio.com/products/products.json"
    );
    const getInfo = response.data.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image: element.image,
        description: element.description,
        price: element.price,
        stock: element.stock,
        genero: element.genero,
        category: element.category,
      };
    });
    return getInfo;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error; // Propagar el error para que sea manejado por el código que llama a esta función
  }
};

const productsDataBase = async () => {
  try {
    const productsApi = await getProducts();

    const existingProducts = await Product.findAll();
    // console.log('Productos existentes en la base de datos:', existingProducts); // Registro de productos existentes en la base de datos

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

const createProductDB = async ( id, name, description, price, image, stock, category, genero ) => {
  const newProduct = { id, name, description, price, image, stock, category, genero }
  try {
      const productCreatedDB = await Product.create(newProduct);
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
