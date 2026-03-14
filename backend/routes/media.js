const { Router } = require('express');
const { getMedias, createMedia } = require('../controllers/mediacontroller');

const router = Router();

router.get('/', getMedias);
router.post('/', createMedia);

module.exports = router;