const { Router } = require('express');
const router = Router();

const { getGeneros, createGenero } = require('../controllers/generoController');

router.get('/', getGeneros);
router.post('/', createGenero);

module.exports = router;