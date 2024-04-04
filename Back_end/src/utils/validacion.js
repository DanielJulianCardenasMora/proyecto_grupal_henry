const validate = (type, value) => {
  const errors = [];

  switch (type) {
    case "name":
      if (!value) {
        errors.push("El nombre es requerido");
      }
      break;
    case "price":
      if (!value || isNaN(value)) {
        errors.push("El precio debe ser un número");
      }
      if (value < 0) {
        errors.push("El precio debe ser mayor o igual que cero");
      }
      break;
  //   case "images":
  // const allowedExtensions = [".jpg", ".jpeg", ".png"];
  
  // if (typeof value === "string" && !isURL && allowedExtensions.some((extension) => value.toLowerCase().endsWith(extension))) {
  //   throw new Error("Debe ser una URL o tener una extensión .jpg, .jpeg o .png");
  // }
  //     if (typeof value !== "string" || value.trim() === "") {
  //       throw new Error("La imagen debe ser una cadena de caracteres");
  //     }
  //     break;

    case "description":
      if (!value && value && typeof value !== "string") {
        errors.push("La descripción debe ser una cadena de caracteres");
      }
      if (!value) {
        errors.push("La descripción es requerida");
      }
      break;
    case "stock":
      if (value && (!Number.isInteger(value) || value < 0)) {
        errors.push("El stock debe ser un número entero positivo");
      }
      break;
    case "genero":
      if (!value) {
        errors.push("Genero es requerido");
      }
      break;
    case "category":
      if (!value) {
        errors.push("Categoria es requerida");
      }
      break;
    default:
      errors.push("Tipo de validación desconocido");
  }

  return errors;
};

module.exports = validate;
