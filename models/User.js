const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
