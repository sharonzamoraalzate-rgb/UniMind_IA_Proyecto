const service = require('../services/consulta.service');

async function crearConsulta(req, res) {
  try {
    const usuarioId = req.headers['usuarioid'] || req.body.usuarioId;
    const resultado = await service.procesarPregunta({ usuarioId, pregunta: req.body.pregunta });
    res.status(201).json(resultado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function historial(req, res) {
  res.json(service.historial(req.params.usuarioId));
}

module.exports = { crearConsulta, historial };