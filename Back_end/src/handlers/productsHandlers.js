const { getProductsByName, getProductDetail, createProductDB, productsDataBase, deleteProductDB, updateProductDB } = require("../controllers/productsControllers");

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
    ;
    if (name) {
      // Llamar a getProductsByName y verificar el resultado
      const productsByName = await getProductsByName(name);
      ; // Imprime el resultado
      filteredProducts = productsByName;
    }

    const paginatedProducts = paginarDatos(filteredProducts, page);

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

  const { name, description, price, stock, genero, category, images, size } = req.body;

  const errors = [];
  const containsOnlyLetters = /^[a-zA-Z\s]*$/;

  if (!name) { errors.push('You must enter a name') }

  if (name.length < 4) { errors.push("The name must be more than 4 characters") }
  
  if (!containsOnlyLetters.test(name)) { errors.push("The name can only contain letters") }
  
  if (!description) { errors.push('You must enter a description') }

  if (!containsOnlyLetters.test(description)) { errors.push('The description can only contain letters') }
  
  if (!price || isNaN(price)) { errors.push('You must enter a valid price') }
  
  if (price < 0) { errors.push('The price must be greater than or equal to zero') }
  
  if (!stock || stock < 0) { errors.push('You must enter a valid stock') }
  
  if (!genero) { errors.push('You must enter a gender') }
  
  if (!category) { errors.push('You must enter a category') }
  
  if (!size) { errors.push("There are no sizes selected") }

  // Si existen errores
  if (errors.length) {
    return res.status(400).json({ errors })
  }
  // Si esta todo OK
  try {
    const newProduct = await createProductDB(name, description, price, images, stock, genero, category, size);

    ;
    return res.status(201).json(newProduct);
  } catch (error) {
    ;
    return res.status(500).json({ error: "Error al crear tu nuevo producto" });
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

const editProduct = async (req, res) => {
  let { id } = req.params;
  let productData = req.body;

  try {
    const updatedProduct = await updateProductDB(id, productData);
    if (updatedProduct) {
      res.status(200).json({ mensaje: "Producto actualizado correctamente", product: updatedProduct });
    } else {
      res.status(404).json("Producto no encontrado.");
    }
  } catch (error) {
    console.error("Error al editar el producto:", error);
    res.status(500).json({ error: "Error interno al editar el producto" });
  }
}

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

module.exports = { getProducts, getDetail, postProduct, deleteProduct, productActivation, editProduct };