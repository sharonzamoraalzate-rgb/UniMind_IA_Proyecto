const repo = require('../repositories/documento.repository');

function crear({ titulo, contenido, categoria }) {
  if (!titulo || !contenido) {
    throw new Error('El título y el contenido son obligatorios');
  }
  return repo.crear({ titulo, contenido, categoria: categoria || 'general' });
}

function listarTodos() {
  return repo.listarTodos();
}

function obtenerPorId(id) {
  const documento = repo.buscarPorId(id);
  if (!documento) throw new Error('Documento no encontrado');
  return documento;
}

module.exports = { crear, listarTodos, obtenerPorId };