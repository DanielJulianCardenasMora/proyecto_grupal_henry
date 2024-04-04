const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { productsDataBase } = require('./src/controllers/productsControllers.js');
const { categoryDataBase } = require("./src/controllers/categoryControllers.js");

require('dotenv').config();
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    await productsDataBase(), await categoryDataBase();
  })
}).catch(error => console.error(error))
