const pool = require('../db');

async function crear({ nombre, correo, password, rol }) {
  const { rows } = await pool.query(
    `INSERT INTO usuarios (nombre, correo, password, rol)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nombre, correo, rol`,
    [nombre, correo, password, rol]
  );
  return rows[0];
}

async function buscarPorCorreo(correo) {
  const { rows } = await pool.query(
    'SELECT id, nombre, correo, password, rol FROM usuarios WHERE correo = $1',
    [correo]
  );
  return rows[0];
}

async function buscarPorId(id) {
  const { rows } = await pool.query(
    'SELECT id, nombre, correo, rol FROM usuarios WHERE id = $1',
    [id]
  );
  return rows[0];
}

module.exports = { crear, buscarPorCorreo, buscarPorId };