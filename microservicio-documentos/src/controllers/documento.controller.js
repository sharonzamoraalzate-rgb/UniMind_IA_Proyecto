const service = require('../services/documento.service');

async function crear(req, res) {
  try {
    const documento = await service.crear(req.body);
    res.status(201).json(documento);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function listar(req, res) {
  try {
    res.json(await service.listarTodos());
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
}

async function obtenerPorId(req, res) {
  try {
    const documento = await service.obtenerPorId(req.params.id);
    res.json(documento);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { crear, listar, obtenerPorId };