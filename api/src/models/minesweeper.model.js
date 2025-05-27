const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const Minesweeper = sequelize.define("Minesweeper", {
  id_mine: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: "users", // Nombre de la tabla referenciada
      key: "id_user",
    },
    onDelete: "CASCADE",
  },
  uso_coins_obtained: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  won: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: "minesweeper",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

User.hasMany(Minesweeper, { foreignKey: "id_user" });
Minesweeper.belongsTo(User, { foreignKey: "id_user" });

module.exports = Minesweeper;
