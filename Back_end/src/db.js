require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { timeStamp } = require("console");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = require('../config')


let sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: false,
  },
});

      sequelize.authenticate()
      .then(() => {
          console.log('Conexion con la base de datos establecida');
      })
      .catch(err => {
          console.error('Error al conectar con la base de datos: ', err);
      });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


const { Order, Product, User, Category, OrderDetail } = sequelize.models;

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order, { through: OrderDetail });
Order.belongsToMany(Product, { through: OrderDetail });

Product.belongsToMany(Category, { through: "product_category",timestamps: false});
Category.belongsToMany(Product, { through: "product_category",timestamps: false });

module.exports = {
    ...sequelize.models,
    conn: sequelize,
};
