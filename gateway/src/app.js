require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const verificarToken = require('./middlewares/verificarJWT');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/usuarios/registro', async (req, res) => {
  try {
    console.log('URL destino:', `${process.env.USUARIOS_URL}/api/usuarios/registro`);
    const { data } = await axios.post(`${process.env.USUARIOS_URL}/api/usuarios/registro`, req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error('ERROR REAL:', err.message);
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Error en el gateway' });
  }
});

app.post('/api/usuarios/login', async (req, res) => {
  try {
    const { data } = await axios.post(`${process.env.USUARIOS_URL}/api/usuarios/login`, req.body);
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Error en el gateway' });
  }
});

app.get('/api/usuarios/perfil', verificarToken, async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.USUARIOS_URL}/api/usuarios/perfil`, {
      headers: { Authorization: req.headers['authorization'] }
    });
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Error en el gateway' });
  }
});

app.use('/api/documentos', verificarToken, async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.DOCUMENTOS_URL}/api/documentos${req.url}`,
      data: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Error en el gateway' });
  }
});

app.use('/api/consultas', verificarToken, async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.CONSULTAS_URL}/api/consultas${req.url}`,
      data: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
      headers: { usuarioId: req.usuario.id },
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Error en el gateway' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway corriendo en puerto ${PORT}`));