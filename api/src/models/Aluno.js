const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Aluno = sequelize.define('Aluno', {
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
  matricula: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: { notEmpty: { msg: 'Matrícula é obrigatória' } },
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: { isEmail: { msg: 'E-mail inválido' } },
  },
  cr: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: { min: 0, max: 10 },
  },
}, {
  tableName: 'alunos',
  timestamps: true,
});

module.exports = Aluno;
