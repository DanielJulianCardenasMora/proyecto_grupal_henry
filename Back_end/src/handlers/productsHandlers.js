const {
  getProductsByName,
  getProductDetail,
  createProductDB,
  productsDataBase,
  deleteProductDB,
} = require("../controllers/productsControllers");
const validate = require("../utils/validacion");

const { filtrarPorNombre, filtrarPorPrecio } = require("../utils/filter");

const paginarDatos = require("../utils/pagination");

const getProducts = async (req, res) => {
  const { name, page, currentPage, sortBy, sortOrder } = req.query;
  try {
    let response;
    let filteredProducts;

    //obtener los productos paginados
    const allProducts = await productsDataBase();
    const paginatedProducts = paginarDatos(allProducts, page, currentPage);

    if (name) {
      filteredProducts = getProductsByName(name);
    } else {
      filteredProducts = paginatedProducts.data;
    }

    filteredProducts = filtrarPorNombre(filteredProducts, sortBy);
    filteredProducts = filtrarPorPrecio(filteredProducts, sortBy, sortOrder);

    response = {
      products: filteredProducts,
      currentPage: paginatedProducts.currentPage,
      totalPage: paginatedProducts.totalPages,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
const getDetail = async (req, res) => {
  let { id } = req.params;

  try {
    const productDetail = await getProductDetail(id);
    if (productDetail) {
      res.status(200).json(productDetail);
    } else {
      res.status(404).json(`No se encontraron productos con el id: ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const postProduct = async (req, res) => {
  const { name, description, price, image, stock, genero, category } = req.body;

  // Perform validations
  const validateFields = (fields) => {
    const validators = {
      name: validate.bind(null, "name"),
      price: validate.bind(null, "price"),
      description: validate.bind(null, "description"),
      stock: validate.bind(null, "stock"),
      image: validate.bind(null, "image"),
      category: validate.bind(null, "category"),
      genero: validate.bind(null, "genero"),
    };

    const errors = [];

    Object.keys(fields).forEach((field) => {
      try {
        validators[field](fields[field]);
      } catch (error) {
        errors.push(error.message);
      }
    });

    return errors;
  };

  // Ejemplo de uso:
  const errors = validateFields({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    stock: req.body.stock,
    genero: req.body.genero,
    category: req.body.category,
  });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const newProduct = await createProductDB(
      name,
      description,
      price,
      image,
      stock,
      genero,
      category
    );
    // console.log("Producto creado con exito!", newProduct);
    res.status(201).json("Producto creado con exito!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear tu nuevo producto" });
  }
};

const deleteProduct = async (req, res) => {
  let { id } = req.params;

  try {
    const deletedProductCount = await deleteProductDB(id);
    if (deletedProductCount > 0) {
      res.status(200).json(`Producto con ID ${id} eliminado correctamente.`);
    } else {
      res.status(404).json("Producto no encontrado."); // Si no se encontró el producto o no se pudo eliminar
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error interno al eliminar el producto" });
  }
};

module.exports = {
  getProducts,
  getDetail,
  postProduct,
  deleteProduct,
};
