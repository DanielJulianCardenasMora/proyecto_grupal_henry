function paginarDatos(datos, page, pageSize) {
  const currentPage = parseInt(page) || 1;
  const productsPerPage = parseInt(pageSize) || 4;
  const offset = (currentPage - 1) * productsPerPage;
  const paginatedData = datos.slice(offset, offset + productsPerPage);
  const totalPages = Math.ceil(datos.length / productsPerPage);

  return {
    data: paginatedData,
    currentPage,
    totalPages,
  };
}

module.exports = paginarDatos;

