const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require("./user.model");

const TicTacToeGame = sequelize.define('TicTacToeGame', {
  id_game: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: User, key: "id_user" }
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false
  },
  symbol: {
    type: DataTypes.ENUM('X', 'O'),
    allowNull: false
  },
  result: {
    type: DataTypes.ENUM('win', 'lose', 'tie'),
    allowNull: false
  },
  uso_coins_earned: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  rounds_played: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  tableName: "tic_tac_toe_games"
});

User.hasMany(TicTacToeGame, { foreignKey: "id_user", onDelete: "CASCADE" });
TicTacToeGame.belongsTo(User, { foreignKey: "id_user" });

module.exports = TicTacToeGame;
