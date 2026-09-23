const service = require('../services/usuario.service');

async function registrar(req, res) {
  try {
    const usuario = await service.registrar(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const resultado = await service.login(req.body);
    res.json(resultado);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

function perfil(req, res) {
  try {
    const usuario = service.perfil(req.usuario.id);
    res.json(usuario);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { registrar, login, perfil };