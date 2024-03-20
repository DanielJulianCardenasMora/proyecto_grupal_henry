const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'order', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        userId: {
            type: DataTypes.UUID, // Cambiado a UUID para relacionar con el usuario
            allowNull: true,
        },
    },
        { timestamps: false }
    );
};