const validateName = (name) => {
  if (!name || name.trim() === "") {
    throw new Error("El nombre es requerido");
  }
};

const validatePrice = (price) => {
  if (!price || price === "") {
    throw new Error("El precio es requerido");
  }
  if (price !== undefined && (isNaN(price) || price < 0)) {
    throw new Error("El precio debe ser un número mayor o igual que cero");
  }
};
const validateDescription = (description) => {
  if (typeof description !== "string" || description.trim() === "") {
    throw new Error("La descripción debe ser una cadena de caracteres");
  }
};

const validateImage = (image) => {
  if (typeof image !== "string") {
    throw new Error("La imagen debe ser una cadena de caracteres");
  }
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const isValidExtension = allowedExtensions.some((extension) =>
    image.toLowerCase().endsWith(extension)
  );
  const isURL = /^https?:\/\//.test(image);
  if (!isValidExtension && !isURL) {
    throw new Error("Debe ser archivos URL , .jpg, .jpeg o .png");
  }
};

const validateStock = (stock) => {
  if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
    throw new Error("El stock debe ser un número entero positivo");
  }
};
const validateCategory = (category) => {
  if (!category || category.trim() === "") {
    throw new Error("La categoría es requerida");
  }
};
const validateGenre = (genre) => {
  if (!genre || genre.trim() === "") {
    throw new Error("El género es requerido");
  }
};

module.exports = {
  validateName,
  validatePrice,
  validateDescription,
  validateStock,
  validateImage,
  validateCategory,
  validateGenre,
};
