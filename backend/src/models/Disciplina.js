const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Disciplina = sequelize.define('Disciplina', {
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
  codigo: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: { notEmpty: { msg: 'Código é obrigatório' } },
  },
  carga_horaria: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 1 },
  },
}, {
  tableName: 'disciplinas',
  timestamps: true,
});

module.exports = Disciplina;
