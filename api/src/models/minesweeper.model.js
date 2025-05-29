const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const Minesweeper = sequelize.define("Minesweeper", {
  id_mine: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: User, key: "id_user" }
  },
  uso_coins_earned: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  won: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  tableName: "minesweeper"
});

User.hasMany(Minesweeper, { foreignKey: "id_user", onDelete: "CASCADE" });
Minesweeper.belongsTo(User, { foreignKey: "id_user" });

module.exports = Minesweeper;
