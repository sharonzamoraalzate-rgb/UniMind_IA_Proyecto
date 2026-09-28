const express = require('express');
const router = express.Router();
const controller = require('../controllers/documento.controller');

router.post('/', controller.crear);
router.get('/', controller.listar);
router.get('/:id', controller.obtenerPorId);

module.exports = router;