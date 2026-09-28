require('dotenv').config();
const express = require('express');
const cors = require('cors');
const documentoRoutes = require('./routes/documento.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/documentos', documentoRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`MS Documentos corriendo en puerto ${PORT}`));