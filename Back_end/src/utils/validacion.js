const validateName = (name) => {
  if (!name) {
    throw new Error("El nombre es requerido");
  }
};

const validatePrice = (price) => {
  if (!price || isNaN(price)) {
    throw new Error("El precio debe ser un número");
  }
  if (price < 0) {
    throw new Error("El precio debe ser mayor o igual que cero");
  }
};
const validateDescription = (description) => {
  if (description && typeof description !== "string") {
    throw new Error("La descripción debe ser una cadena de caracteres");
  }
};
const validateStock = (stock) => {
  if (stock && (!Number.isInteger(stock) || stock < 0)) {
    throw new Error("El stock debe ser un número entero positivo");
  }
};
module.exports = {
  validateName,
  validatePrice,
  validateDescription,
  validateStock,
};
