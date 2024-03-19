const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { productsDataBase } = require('../Back_end/src/controllers/productsControllers.js')
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    server.listen(3001, async () => {
        console.log('%s listening at 3001'); // eslint-disable-line no-console
        await productsDataBase();
    });
});
