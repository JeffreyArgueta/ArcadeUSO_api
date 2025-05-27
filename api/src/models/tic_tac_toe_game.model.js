// models/tic_tac_toe_game.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TicTacToeGame = sequelize.define('TicTacToeGame', {
  id_game: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM('facil', 'medio', 'dificil'),
    allowNull: false,
  },
  symbol: {
    type: DataTypes.ENUM('X', 'O'),
    allowNull: false,
  },
  result: {
    type: DataTypes.ENUM('win', 'lose', 'tie'),
    allowNull: false,
  },
  uso_coins_earned: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  rounds_played: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'tic_tac_toe_games',
  timestamps: false,
});

module.exports = TicTacToeGame;
