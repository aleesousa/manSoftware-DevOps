const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Sala = require('./Sala');
const Solicitante = require('./Solicitante');

const Reserva = sequelize.define('Reserva', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    inicio: { type: DataTypes.DATE, allowNull: false },
    fim: { type: DataTypes.DATE, allowNull: false },
}, { tableName: 'reservas', timestamps: false });

// ── Associações ──────────────────────────────────────────────
Reserva.belongsTo(Sala, { foreignKey: 'sala_id' });
Reserva.belongsTo(Solicitante, { foreignKey: 'solicitante_id' });
Sala.hasMany(Reserva, { foreignKey: 'sala_id' });
Solicitante.hasMany(Reserva, { foreignKey: 'solicitante_id' });
module.exports = Reserva;