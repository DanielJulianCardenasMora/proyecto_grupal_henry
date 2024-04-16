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
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      size: {
        type: DataTypes.ARRAY(DataTypes.JSON), // Modificar el tipo de datos de STRING a JSON
        allowNull: true,
        defaultValue: [],
        get() {
          const size = this.getDataValue('size');
          // Si `size` es una cadena, entonces es un array JSON serializado, así que lo convertimos a un array de objetos JSON
          if (typeof size === 'string') {
            return JSON.parse(size);
          } else {
            return size; // Si `size` ya es un array de objetos JSON, lo devolvemos como está
          }
        },
        set(value) {
          // Si el valor proporcionado es un array de objetos JSON, lo almacenamos como está
          // Si no, lo convertimos a una cadena JSON antes de almacenarlo
          if (Array.isArray(value) && value.every(item => typeof item === 'object')) {
            this.setDataValue('size', value);
          } else {
            this.setDataValue('size', JSON.stringify(value));
          }
        }
      },
    },
    { timestamps: false }
  );
};
