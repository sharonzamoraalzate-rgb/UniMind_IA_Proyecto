const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');
const verificarToken = require('../middlewares/auth.middleware');

router.post('/registro', controller.registrar);
router.post('/login', controller.login);
router.get('/perfil', verificarToken, controller.perfil);

module.exports = router;