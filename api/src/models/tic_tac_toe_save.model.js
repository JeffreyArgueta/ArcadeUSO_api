// models/tic_tac_toe_save.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TicTacToeSave = sequelize.define('TicTacToeSave', {
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true
  },
  board_state: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  rounds: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  },
  player_symbol: {
    type: DataTypes.ENUM('X', 'O'),
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM('facil', 'medio', 'dificil'),
    allowNull: false,
  },
  session_uso_coins: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'tic_tac_toe_saves',
  timestamps: false
});

module.exports = TicTacToeSave;
