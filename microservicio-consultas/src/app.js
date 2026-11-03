require('dotenv').config();
const express = require('express');
const cors = require('cors');
const consultaRoutes = require('./routes/consulta.routes');

const app = express();
app.use(cors());
app.use(express.json());
const client = require('prom-client');
client.collectDefaultMetrics();

const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP',
  labelNames: ['method', 'route', 'status'],
});

app.use((req, res, next) => {
  res.on('finish', () => {
    const route = req.originalUrl.split('?')[0];
    if (route !== '/metrics') {
      httpRequests.inc({ method: req.method, route, status: res.statusCode });
    }
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
app.use('/api/consultas', consultaRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`MS Consultas corriendo en puerto ${PORT}`));