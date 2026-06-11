const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Sala = sequelize.define('Sala', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
},
   nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
}, {
    tableName: 'salas',
    timestamps: false,
});

module.exports = Sala;