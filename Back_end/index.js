const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { productsDataBase } = require('./src/controllers/productsControllers.js');
const { categoryDataBase } = require("./src/controllers/categoryControllers.js");

require('dotenv').config();
let PORT = process.env.PORT;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT || `http://localhost:3001` , async () => {
    console.log(`Server listening on port ${PORT}`);
    await productsDataBase(), await categoryDataBase();
  })
}).catch(error => console.error(error))
