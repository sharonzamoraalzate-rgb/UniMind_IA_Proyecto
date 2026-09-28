require('dotenv').config();
const express = require('express');
const cors = require('cors');
const consultaRoutes = require('./routes/consulta.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/consultas', consultaRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`MS Consultas corriendo en puerto ${PORT}`));