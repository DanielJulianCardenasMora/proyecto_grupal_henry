const { Category, Product } = require("../db");
const axios = require("axios");
require('dotenv').config();
const { URL_CATEGORY } = process.env;

// const getCategory = async () => {
//     try {
//         const response = await axios.get(`${URL_CATEGORY}`);
//         const getInfo = response.data.map((element) => {
//             return {
//                 name: element.name,
//             };
//         });
//         return getInfo;
//     } catch (error) {
//         console.error("Error al obtener productos:", error);
//         throw error;
//     }
// };

const categoryArray = [
    { name: "Pantalones" },
    { name: "Remeras" },
    { name: "Chaquetas" },
    { name: "Buzos" },
    { name: "Faldas" },
    { name: "Camisas" }
];

const categoryDataBase = async () => {
    try {

        const existingCategory = await Category.findAll({ include: Product });

        if (!existingCategory.length) {

            const createCategory = await Category.bulkCreate(categoryArray, { include: Product });

            return createCategory;

        } else {
            return existingCategory;
        }
    } catch (error) {
        console.error(
            "Error al procesar las Category en la base de datos:", error);
        throw error;
    }
};


module.exports = { categoryDataBase, getCategory };
