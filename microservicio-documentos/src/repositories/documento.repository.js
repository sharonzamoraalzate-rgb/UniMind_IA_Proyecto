const { documentos, siguienteId } = require('../models/documento.model');

function crear(documento) {
  documento.id = siguienteId();
  documentos.push(documento);
  return documento;
}

function listarTodos() {
  return documentos;
}

function buscarPorId(id) {
  return documentos.find(d => d.id === Number(id));
}

module.exports = { crear, listarTodos, buscarPorId };