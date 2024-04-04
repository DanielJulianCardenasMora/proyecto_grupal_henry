require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { timeStamp } = require("console");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ?new Sequelize({
      database: "railway",
      username: "postgres",
      password: "VOFlpSYCAjwfTonyojPbvzLkfkHYpiWd",
      host: "viaduct.proxy.rlwy.net",
      port: 57324,
      dialect: "postgres",
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
      },
    })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
        {
            logging: false, 
            native: false, 
            force: true
        }
      );

      sequelize.authenticate()
      .then(() => {
          console.log('Connection to the database has been established successfully.');
      })
      .catch(err => {
          console.error('Unable to connect to the database:', err);
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
