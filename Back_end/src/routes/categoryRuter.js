const { Router } = require('express');
const { handlerCategory } = require('../handlers/categoryHandlers');
const router = Router();

router.get('/', handlerCategory)

module.exports = router;