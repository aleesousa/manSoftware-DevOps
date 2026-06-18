const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Professor = sequelize.define('Professor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: { msg: 'Nome é obrigatório' } },
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: { isEmail: { msg: 'E-mail inválido' } },
  },
  departamento: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'professores',
  timestamps: true,
});

module.exports = Professor;
