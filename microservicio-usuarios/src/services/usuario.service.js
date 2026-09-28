const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repo = require('../repositories/usuario.repository');

async function registrar({ nombre, correo, password, rol }) {
  if (repo.buscarPorCorreo(correo)) throw new Error('El correo ya está registrado');
  const passwordHash = await bcrypt.hash(password, 10);
  const usuario = repo.crear({ nombre, correo, password: passwordHash, rol: rol || 'estudiante' });
  return { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo };
}

async function login({ correo, password }) {
  const usuario = repo.buscarPorCorreo(correo);
  if (!usuario) throw new Error('Credenciales inválidas');
  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) throw new Error('Credenciales inválidas');

  const token = jwt.sign(
    { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
  return { token };
}

function perfil(id) {
  const usuario = repo.buscarPorId(id);
  if (!usuario) throw new Error('Usuario no encontrado');
  return { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
}

module.exports = { registrar, login, perfil };