const { Product, Category } = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');

const cloudinary = require('../utils/cloudinaryConfig'); // Importa la configuración de Cloudinary

const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://wearfashion-947fb-default-rtdb.firebaseio.com/products/products.json"
    );
    const getInfo = response.data.map((element) => {
      return {
        name: element.name,
        images: Array.isArray(element.images) ? element.images : [element.images],
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

const productsDataBase = async () => {
  try {
    const productsApi = await getProducts();

    const existingProducts = await Product.findAll({
      include: [{
        model: Category,
        attributes: ["name"],
        through: { attributes: [] },
      }],
    });

    if (!existingProducts.length) {
      const createdProducts = await Product.bulkCreate(productsApi);

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

const createProductDB = async (name, description, price, images, stock, genero, category) => {
  const newProduct = { name, description, price, images, stock, genero, category }
  try {
    const imageUrls = []; // Creamos un array para almacenar las URLs de las imágenes


    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path);
      imageUrls.push(result.secure_url);
    }
    newProduct.images = imageUrls;


    const productCreatedDB = await Product.create(newProduct);


    const categoryName = await Category.findOne({ where: { name: category } });

    if (!categoryName) {
      console.log("La categoría especificada no existe.");
      return null;
    }
    await productCreatedDB.addCategory(categoryName);
    console.log("Nombre de la categoría encontrada:", categoryName.name);
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
