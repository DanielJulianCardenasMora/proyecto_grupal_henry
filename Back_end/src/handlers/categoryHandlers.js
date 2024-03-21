const { categoryDataBase } = require('../controllers/categoryControllers')

const handlerCategory = async (req, res) => {
    try {
        const categoryDb = await categoryDataBase();
        res.status(200).json(categoryDb);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { handlerCategory };