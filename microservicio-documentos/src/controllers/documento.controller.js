const service = require('../services/documento.service');

function crear(req, res) {
  try {
    const documento = service.crear(req.body);
    res.status(201).json(documento);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function listar(req, res) {
  res.json(service.listarTodos());
}

function obtenerPorId(req, res) {
  try {
    const documento = service.obtenerPorId(req.params.id);
    res.json(documento);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { crear, listar, obtenerPorId };