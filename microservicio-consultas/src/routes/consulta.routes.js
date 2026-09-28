const express = require('express');
const router = express.Router();
const controller = require('../controllers/consulta.controller');

router.post('/', controller.crearConsulta);
router.get('/historial/:usuarioId', controller.historial);

module.exports = router;