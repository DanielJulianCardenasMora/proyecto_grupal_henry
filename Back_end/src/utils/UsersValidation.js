const userValidate = (type, value) => {
  const errors = [];

  switch (type) {
    case "name":
      if (!value) {
        errors.push("El nombre es requerido.");
      }
      if (typeof value !== "string") {
        errors.push("El nombre debe ser una cadena de texto.");
      }
      break;
    case "email":
      if (!value) {
        errors.push("El email es requerido.");
      }
      if (typeof value !== "string") {
        errors.push("El email debe ser una cadena de texto.");
      }
      if (!/\S+@\S+\.\S+/.test(value)) {
        errors.push(
          "El email debe ser una dirección de correo electrónico válida."
        );
      }
      break;
    case "password":
      if (!value) {
        errors.push("La contraseña es requerida.");
      }
      if (typeof value !== "string") {
        errors.push("La contraseña debe ser una cadena de texto.");
      }
      if (value.length < 8) {
        errors.push("La contraseña debe tener al menos 8 caracteres.");
      }

      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
        errors.push(
          "La contraseña debe contener al menos un carácter especial."
        );
      }

      if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
        errors.push(
          "La contraseña debe contener tanto letras mayúsculas como minúsculas."
        );
      }

      if (!/\d/.test(value)) {
        errors.push("La contraseña debe contener al menos un número.");
      }
      break;
    case "phone":
      if (!value) {
        errors.push("El teléfono es requerido.");
      }
      if (typeof value !== "string") {
        errors.push("El teléfono debe ser una cadena de texto.");
      }
      if (!/^\+\d{10,}$/.test(value)) {
        errors.push("El teléfono debe tener un formato válido.");
      }
      break;
    case "country":
      if (!value) {
        errors.push("El país es requerido.");
      }
      if (typeof value !== "string") {
        errors.push("El país debe ser una cadena de texto.");
      }
      break;
    case "city":
      if (!value) {
        errors.push("La ciudad es requerida.");
      }
      if (typeof value !== "string") {
        errors.push("La ciudad debe ser una cadena de texto.");
      }
      break;
    default:
      throw new Error(`No se puede determinar el error: ${type}`);
  }

  return errors;
};

module.exports = userValidate;
