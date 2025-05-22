const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false // Desativa os logs SQL no console
});

// Testa a conexão
sequelize.authenticate()
  .then(() => console.log('✅ Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('❌ Erro ao conectar com o banco de dados:', err));

module.exports = sequelize;
