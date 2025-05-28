const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: { len: [3, 50] }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    validate: { notEmpty: true }
  },
  google_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
    defaultValue: null
  },
  authentication_method: {
    type: DataTypes.ENUM('manual', 'google'),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('player', 'admin'),
    allowNull: false,
    defaultValue: 'player'
  },
  uso_coins: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0
  },
  daro_points: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0
  }
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  tableName: "users"
});

module.exports = User;
