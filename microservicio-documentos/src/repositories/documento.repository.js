const pool = require('../db');

async function crear({ titulo, contenido, categoria }) {
  const { rows } = await pool.query(
    `INSERT INTO documentos (titulo, contenido, categoria)
     VALUES ($1, $2, $3)
     RETURNING id, titulo, contenido, categoria`,
    [titulo, contenido, categoria]
  );
  return rows[0];
}

async function listarTodos() {
  const { rows } = await pool.query(
    'SELECT id, titulo, contenido, categoria FROM documentos ORDER BY id'
  );
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await pool.query(
    'SELECT id, titulo, contenido, categoria FROM documentos WHERE id = $1',
    [id]
  );
  return rows[0];
}

module.exports = { crear, listarTodos, buscarPorId };