const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Product', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
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
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
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