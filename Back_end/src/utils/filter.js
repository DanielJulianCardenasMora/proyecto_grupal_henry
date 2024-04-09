function filtrarPorNombre(products, sortBy) {
  if (sortBy === "atoz") return products.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "ztoa") return products.sort((a, b) => b.name.localeCompare(a.name));
  return products;
}

function filtrarPorPrecio(products, sortOrder) {
  console.log('sortorder desde dilter', sortOrder);
  if (sortOrder === "asc") {
    return products.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    return products.sort((a, b) => b.price - a.price);
  } else {
    return products; // Devolver los productos sin ordenar si no se especifica sortOrder
  }
}
function filtrarPorGenero(products, gender) {
  if (gender) {
    return products.filter(product => product.genero.toLowerCase() === gender.toLowerCase());
  }
  return products;
}

function filtrarPorCategoria(products, category) {
  console.log('category desde filter',category)
  if (category) {
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase() ||  product.Categories.some(cat => cat.name.toLowerCase() === category.toLowerCase()));
  }
  return products;
}

module.exports = { filtrarPorNombre, filtrarPorPrecio, filtrarPorGenero, filtrarPorCategoria };