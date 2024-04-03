const multer = require('multer');
const fs = require('fs');


//multer almacena temporalmente las imagenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); //archivo donde se almacena temporalmente las imagenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); //npmbre de archivo unico
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Implementa tu lógica de filtro de archivo aquí si es necesario
        cb(null, true); // Acepta todos los archivos por ahora
    }
}).array('images');

console.log("Middleware de Multer ejecutado");

module.exports = upload;