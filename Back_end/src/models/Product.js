const { DataTypes } = require("sequelize");
const {
  validateName,
  validatePrice,
  validateDescription,
  validateStock,
} = require("../utils/validacion");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          customValidator(value) {
            validatePrice(value);
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          customValidator(value) {
            validateStock(value);
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
