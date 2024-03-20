const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { productsDataBase } = require('../Back_end/src/controllers/productsControllers.js')
const PORT = 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    server.listen(PORT, async () => {
      console.log(`Server listening on port ${PORT}`);
      await productsDataBase();
    })
  }).catch(error => console.error(error))
