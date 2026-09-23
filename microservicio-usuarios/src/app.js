require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`MS Usuarios corriendo en puerto ${PORT}`));