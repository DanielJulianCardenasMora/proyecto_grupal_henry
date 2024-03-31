const { getProductsByName, getProductDetail, createProductDB, productsDataBase, deleteProductDB } = require("../controllers/productsControllers");

const { filtrarPorNombre, filtrarPorPrecio } = require("../utils/filter");

const paginarDatos = require("../utils/pagination");

const getProducts = async (req, res) => {
  const { name, page, currentPage, sortBy, sortOrder } = req.query;
  try {
    let response;

    const allProducts = await productsDataBase();

    //obtener los productos paginados
    let filteredProducts = allProducts;
    if (name) {
      filteredProducts = getProductsByName(name);
    }

    filteredProducts = filtrarPorNombre(filteredProducts, sortBy);
    filteredProducts = filtrarPorPrecio(filteredProducts, sortBy, sortOrder);

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
  const { name, description, price, stock, genero, category } = req.body;

  if (!name || !price || !req.files || !description || !stock) {
    return res.status(400).json({ error: "El campo 'name', 'price' y 'images' son obligatorios." });
  }

  try {
    const newProduct = await createProductDB(name, description, price, req.files, stock, genero, category);
    res.status(201).json(newProduct);

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: "Error al crear tu nuevo producto" });
  }
}

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
