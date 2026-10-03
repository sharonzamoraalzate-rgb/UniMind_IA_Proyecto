const axios = require('axios');
const repo = require('../repositories/consulta.repository');

async function procesarPregunta({ usuarioId, pregunta }) {
  if (!pregunta) throw new Error('La pregunta es obligatoria');
  if (!Number.isInteger(Number(usuarioId))) throw new Error('El usuario es obligatorio');

  let respuesta = 'No encontré información relacionada. Intenta reformular tu pregunta.';

  try {
    const { data: documentos } = await axios.get(`${process.env.DOCUMENTOS_URL}/api/documentos`);
    const coincidencia = documentos.find(doc =>
      doc.titulo.toLowerCase().includes(pregunta.toLowerCase()) ||
      doc.contenido.toLowerCase().includes(pregunta.toLowerCase())
    );
    if (coincidencia) {
      respuesta = `Según "${coincidencia.titulo}": ${coincidencia.contenido}`;
    }
  } catch (err) {
    console.error('No se pudo consultar MS Documentos:', err.message);
  }

  return await repo.crear({ usuarioId: Number(usuarioId), pregunta, respuesta });
}

async function historial(usuarioId) {
  if (!Number.isInteger(Number(usuarioId))) throw new Error('Usuario no válido');
  return await repo.historialPorUsuario(Number(usuarioId));
}

module.exports = { procesarPregunta, historial };