const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários para app mobile',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://user-api-6z73.onrender.com'
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' 
          ? 'Servidor de produção'
          : 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// Validação básica do swaggerSpec
if (!swaggerSpec || typeof swaggerSpec !== 'object') {
  console.error('Erro ao gerar especificação Swagger');
  process.exit(1);
}

module.exports = swaggerSpec; 