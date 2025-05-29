const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require("./user.model");

const TicTacToeSave = sequelize.define('TicTacToeSave', {
  id_save: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: User, key: "id_user" }
  },
  board_state: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  rounds: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false
  },
  player_symbol: {
    type: DataTypes.ENUM('X', 'O'),
    allowNull: false
  },
  session_uso_coins: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0
  }
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  tableName: "tic_tac_toe_saves"
});

User.hasMany(TicTacToeSave, { foreignKey: "id_user", onDelete: "CASCADE" });
TicTacToeSave.belongsTo(User, { foreignKey: "id_user" });

module.exports = TicTacToeSave;
