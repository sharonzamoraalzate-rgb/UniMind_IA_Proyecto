const pool = require('../db');

async function crear({ usuarioId, pregunta, respuesta }) {
  const { rows } = await pool.query(
    `INSERT INTO consultas (usuario_id, pregunta, respuesta)
     VALUES ($1, $2, $3)
     RETURNING id, usuario_id AS "usuarioId", pregunta, respuesta, fecha`,
    [usuarioId, pregunta, respuesta]
  );
  return rows[0];
}

async function historialPorUsuario(usuarioId) {
  const { rows } = await pool.query(
    `SELECT id, usuario_id AS "usuarioId", pregunta, respuesta, fecha
     FROM consultas WHERE usuario_id = $1 ORDER BY id`,
    [usuarioId]
  );
  return rows;
}

module.exports = { crear, historialPorUsuario };