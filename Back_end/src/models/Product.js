const { DataTypes } = require("sequelize");
const {
  validateName,
  validatePrice,
  validateDescription,
  validateStock,
} = require("../utils/validacion");

module.exports = (sequelize) => {
  sequelize.define(
<<<<<<< HEAD
    "Product",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
=======
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
>>>>>>> d2a7a6712a98ca4bacedc1b4202854fde91d53be
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
<<<<<<< HEAD
        validate: {
          customValidator(value) {
            validateName(value);
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            validateDescription(value);
          },
        },
=======
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
>>>>>>> d2a7a6712a98ca4bacedc1b4202854fde91d53be
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
<<<<<<< HEAD
        validate: {
          customValidator(value) {
            validatePrice(value);
          },
        },
=======
>>>>>>> d2a7a6712a98ca4bacedc1b4202854fde91d53be
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
<<<<<<< HEAD
        allowNull: false,
        validate: {
          customValidator(value) {
            validateStock(value);
          },
        },
      },
      category: {
        type: DataTypes.STRING,
=======
>>>>>>> d2a7a6712a98ca4bacedc1b4202854fde91d53be
        allowNull: true,
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> d2a7a6712a98ca4bacedc1b4202854fde91d53be
