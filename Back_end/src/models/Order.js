const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'Order', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        detalle: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        // userId: {
        //     type: DataTypes.UUID, // Cambiado a UUID para relacionar con el usuario
        //     allowNull: true,
        // },
        // productId: {
        //     type: DataTypes.UUID, // Cambiado a UUID para relacionar con el usuario
        //     allowNull: true,
        // },
    },
        { timestamps: false }
    );
};