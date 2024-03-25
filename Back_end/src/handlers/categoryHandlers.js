const { categoryDataBase } = require('../controllers/categoryControllers')

const handlerCategory = async (req, res) => {
    try {
        const { category } = req.query;

        let categories  = await categoryDataBase();

        if (category) {
            categories = categories.filter(cat => cat.name === category)
            console.log(categories)
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { handlerCategory };