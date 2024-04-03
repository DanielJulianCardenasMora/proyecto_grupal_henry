function filtrarPorNombre(products, sortBy) {
  if (sortBy === "atoz") return products.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "ztoa") return products.sort((a, b) => b.name.localeCompare(a.name));
  return products;
}

function filtrarPorPrecio(products, sortBy, sortOrder) {
  if (sortBy === "price") {
    if (sortOrder === "asc") return products.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") return products.sort((a, b) => b.price - a.price);
  }
  return products;
}
function filtrarPorGenero(products, gender) {
  if (gender) {
    return products.filter(product => product.genero.toLowerCase() === gender.toLowerCase());
  }
  return products;
}

function filtrarPorCategoria(products, category) {
  if (category) {
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase() || product.Categories.map(cat => cat.toLowerCase()).includes(category.toLowerCase()));
  }
  return products;
}

module.exports = { filtrarPorNombre, filtrarPorPrecio, filtrarPorGenero, filtrarPorCategoria };