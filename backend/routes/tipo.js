const { Router } = require('express');
const { getTipos, createTipo } = require('../controllers/tipocontroller');

const router = Router();

router.get('/', getTipos);
router.post('/', createTipo);

module.exports = router;