const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: { // Agregar la propiedad 'category'
        type: DataTypes.STRING, // O el tipo de datos adecuado para el nombre de la categoría
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // Por defecto, un producto está activo
      },
      size: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {} // Valor por defecto, un objeto vacío
      },
    },
    { timestamps: false }
  );
};
