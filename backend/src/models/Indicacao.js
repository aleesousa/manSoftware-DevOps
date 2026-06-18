const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Indicacao = sequelize.define('Indicacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  professor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'professores', key: 'id' },
  },
  aluno_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'alunos', key: 'id' },
  },
  disciplina_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'disciplinas', key: 'id' },
  },
  status: {
    type: DataTypes.ENUM('pendente', 'aprovado', 'recusado'),
    allowNull: false,
    defaultValue: 'pendente',
  },
  justificativa: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'indicacoes',
  timestamps: true,
});

module.exports = Indicacao;
