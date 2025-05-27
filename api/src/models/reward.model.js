const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Reward = sequelize.define("Reward", {
  id_reward: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  rarity: {
    type: DataTypes.ENUM('common', 'epic', 'legendary'),
    allowNull: false
  },
  daro_points_value: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  chance: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  duration: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    validate: { min: 0 }
  }
}, {
  timestamps: false,
  tableName: "rewards"
});

module.exports = Reward;
