const {
  getProductsByName,
  getProductDetail,
  createProductDB,
  productsDataBase,
  deleteProductDB,
} = require("../controllers/productsControllers");

const { Product } = require("../db");

const { filtrarPorNombre, filtrarPorPrecio, filtrarPorGenero,
  filtrarPorCategoria } = require("../utils/filter");

const paginarDatos = require("../utils/pagination");
const validate = require("../utils/validacion");

const getProducts = async (req, res) => {
  const { name, page, currentPage, sortBy, sortOrder, gender, category } = req.query;
  try {
    let response;

    const allProducts = await productsDataBase();

    //obtener los productos paginados
    let filteredProducts = allProducts.filter(products => products.active === true);

    filteredProducts = filtrarPorGenero(filteredProducts, gender);
    filteredProducts = filtrarPorCategoria(filteredProducts, category);
    filteredProducts = filtrarPorPrecio(filteredProducts, sortOrder);
    console.log('sortorder',sortOrder);
    if (name) {
      // Llamar a getProductsByName y verificar el resultado
      const productsByName = await getProductsByName(name);
      console.log("Products by name:", productsByName); // Imprime el resultado
      filteredProducts = productsByName;
    }

    // filteredProducts = filtrarPorNombre(filteredProducts, sortBy);
    // filteredProducts = filtrarPorPrecio(filteredProducts, sortOrder);
    const paginatedProducts = paginarDatos(filteredProducts, page, currentPage);

    response = {
      products: paginatedProducts.data,
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
  console.log("Datos del cuerpo de la solicitud:", req.body);
  console.log("Archivos recibidos:", req.files);


  const { name, description, price, stock, genero, category } = req.body;

  try {
    // Validar los campos del formulario
    validate("name", name);
    validate("description", description);
    validate("price", price);

    // Crear el producto en la base de datos
    const newProduct = await createProductDB(name, description, price, req.files, stock, genero, category);

    console.log(`El producto ${name} fue creado con exito!!`);
    res.status(201).json(newProduct);
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

const productActivation = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    if (product.stock <= 0) {
      product.active = !product.active; // Invierte el estado de activación
      await product.save();
    }
    res.status(200).json({ message: `Producto ${product.name} ${product.active ? 'activado' : 'desactivado'}` })
  } catch (error) {
    console.error("Error al activar/desactivar producto", error)
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
module.exports = {
  getProducts,
  getDetail,
  postProduct,
  deleteProduct,
  productActivation
};
