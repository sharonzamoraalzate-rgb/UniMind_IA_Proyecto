const repo = require('../repositories/documento.repository');

async function crear({ titulo, contenido, categoria }) {
  if (!titulo || !contenido) {
    throw new Error('El título y el contenido son obligatorios');
  }
  return await repo.crear({ titulo, contenido, categoria: categoria || 'general' });
}

async function listarTodos() {
  return await repo.listarTodos();
}

async function obtenerPorId(id) {
  if (!Number.isInteger(Number(id))) throw new Error('Documento no encontrado');
  const documento = await repo.buscarPorId(Number(id));
  if (!documento) throw new Error('Documento no encontrado');
  return documento;
}

module.exports = { crear, listarTodos, obtenerPorId };