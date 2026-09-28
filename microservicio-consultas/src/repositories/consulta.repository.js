const { consultas, siguienteId } = require('../models/consulta.model');

function crear(consulta) {
  consulta.id = siguienteId();
  consultas.push(consulta);
  return consulta;
}

function historialPorUsuario(usuarioId) {
  return consultas.filter(c => c.usuarioId === Number(usuarioId));
}

module.exports = { crear, historialPorUsuario };