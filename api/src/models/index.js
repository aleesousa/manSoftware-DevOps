const sequelize = require('../database');
const Professor = require('./Professor');
const Aluno = require('./Aluno');
const Disciplina = require('./Disciplina');
const Indicacao = require('./Indicacao');

// Associações
Professor.hasMany(Indicacao, { foreignKey: 'professor_id', as: 'indicacoes' });
Aluno.hasMany(Indicacao, { foreignKey: 'aluno_id', as: 'indicacoes' });
Disciplina.hasMany(Indicacao, { foreignKey: 'disciplina_id', as: 'indicacoes' });

Indicacao.belongsTo(Professor, { foreignKey: 'professor_id', as: 'professor' });
Indicacao.belongsTo(Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
Indicacao.belongsTo(Disciplina, { foreignKey: 'disciplina_id', as: 'disciplina' });

module.exports = { sequelize, Professor, Aluno, Disciplina, Indicacao };
