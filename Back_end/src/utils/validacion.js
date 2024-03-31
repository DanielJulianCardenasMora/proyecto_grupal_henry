const validate = (type, value) => {
  switch (type) {
    case "name":
      if (!value) {
        throw new Error("El nombre es requerido");
      }
      break;
    case "price":
      if (!value || isNaN(value)) {
        throw new Error("El precio debe ser un número");
      }
      if (value < 0) {
        throw new Error("El precio debe ser mayor o igual que cero");
      }
      break;
    case "image":
      if (typeof value !== "string") {
        throw new Error("La imagen debe ser una cadena de caracteres");
      }
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const isValidExtension = allowedExtensions.some((extension) =>
        value.toLowerCase().endsWith(extension)
      );
      const isURL = /^https?:\/\//.test(value);
      if (!isValidExtension && !isURL) {
        throw new Error(
          "Debe ser una URL o tener una extensión .jpg, .jpeg o .png"
        );
      }
      break;
    case "description":
      if (!value && value && typeof value !== "string") {
        throw new Error("La descripción debe ser una cadena de caracteres");
      }
      if (!value) {
        throw new Error("La descripción es requerida");
      }
      break;
    case "stock":
      if (value && (!Number.isInteger(value) || value < 0)) {
        throw new Error("El stock debe ser un número entero positivo");
      }
      break;
    case "genero":
      if (!value) {
        throw new Error("Genero es requerido");
      }
      break;
    case "category":
      if (!value) {
        throw new Error("Categoria es requerida");
      }
      break;
    default:
      throw new Error("Tipo de validación desconocido");
  }
};

module.exports = validate;
