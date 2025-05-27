const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const Catbross = sequelize.define("Catbross", {
  id_catbross: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: User, key: "id_user" }
  },
  completed_stages: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  time_left: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  uso_coins_obtained: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  tableName: "catbross"
});

User.hasMany(Catbross, { foreignKey: "id_user", onDelete: "CASCADE" });
Catbross.belongsTo(User, { foreignKey: "id_user" });

module.exports = Catbross;
