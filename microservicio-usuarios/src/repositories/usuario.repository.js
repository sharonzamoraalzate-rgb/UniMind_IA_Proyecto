const { usuarios, idCounter, incrementarId } = require('../models/usuario.model');

function crear(usuario) {
  usuario.id = idCounter;
  incrementarId();
  usuarios.push(usuario);
  return usuario;
}

function buscarPorCorreo(correo) {
  return usuarios.find(u => u.correo === correo);
}

function buscarPorId(id) {
  return usuarios.find(u => u.id === id);
}

module.exports = { crear, buscarPorCorreo, buscarPorId };