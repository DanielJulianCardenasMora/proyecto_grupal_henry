const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require('dotenv').config();
const { productsDataBase } = require('./src/controllers/productsControllers.js');
const { categoryDataBase } = require("./src/controllers/categoryControllers.js");

const {PORT} = require('./config.js')


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT || `http://localhost:3001` , async () => {
    console.log(`Server listening on port ${PORT}`);
    await productsDataBase(), await categoryDataBase();
  })
}).catch(error => console.error(error))
