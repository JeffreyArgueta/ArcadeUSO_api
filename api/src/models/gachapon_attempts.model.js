const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");
const Reward = require("./reward.model");

const GachaponAttempts = sequelize.define("GachaponAttempts", {
  id_attempt: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: User, key: "id_user" }
  },
  id_reward: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: Reward, key: "id_reward" }
  },
  daro_points_value_earned: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  tableName: "gachapon_attempts"
});

User.hasMany(GachaponAttempts, { foreignKey: "id_user", onDelete: "CASCADE" });
GachaponAttempts.belongsTo(User, { foreignKey: "id_user" });

Reward.hasMany(GachaponAttempts, { foreignKey: "id_reward", onDelete: "CASCADE" });
GachaponAttempts.belongsTo(Reward, { foreignKey: "id_reward" });

module.exports = GachaponAttempts;
