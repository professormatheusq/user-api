require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const sequelize = require('./models/sequelize');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use('/auth', authRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Tratamento de erros
app.use(errorHandler);

// Tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

// Inicialização do servidor
sequelize.sync().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 API pronta na porta ${PORT}`);
    console.log(`📝 Documentação disponível em /api-docs`);
  });
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
  process.exit(1);
});
