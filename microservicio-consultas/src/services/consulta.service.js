const axios = require('axios');
const repo = require('../repositories/consulta.repository');

async function procesarPregunta({ usuarioId, pregunta }) {
  if (!pregunta) throw new Error('La pregunta es obligatoria');

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

  const consulta = repo.crear({
    usuarioId: Number(usuarioId),
    pregunta,
    respuesta,
    fecha: new Date().toISOString(),
  });

  return consulta;
}

function historial(usuarioId) {
  return repo.historialPorUsuario(usuarioId);
}

module.exports = { procesarPregunta, historial };