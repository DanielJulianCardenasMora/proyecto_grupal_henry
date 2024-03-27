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

const upload = multer({ storage: storage });

module.exports = upload;