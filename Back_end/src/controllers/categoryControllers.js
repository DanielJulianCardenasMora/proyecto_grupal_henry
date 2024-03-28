const { Category, Product } = require("../db");
const axios = require("axios");

const getCategory = async () => {
    try {
        const response = await axios.get(
            "https://wearfashion-947fb-default-rtdb.firebaseio.com/products/category.json"
        );
        const getInfo = response.data.map((element) => {
            return {
                name: element.name,
            };
        });
        return getInfo;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error; 
    }
};

const categoryDataBase = async () => {
    try {
        const categoryApi = await getCategory();

        const existingCategory = await Category.findAll({ include: Product });
        //console.log('Productos existentes en la base de datos:', existingCategory); 

        if (!existingCategory.length) {
            const createCategory = await Category.bulkCreate(categoryApi);
          //  console.log('Productos creados en la base de datos:', createCategory); 
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

module.exports = { categoryDataBase };