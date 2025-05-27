const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const TokenStore = sequelize.define("TokenStore", {
  id_token: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  jti: {
    type: DataTypes.CHAR(36),
    unique: true,
    allowNull: false
  },
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: User, key: "id_user" }
  },
  expires_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL 24 HOUR"),
  }
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
  tableName: "tokens_store"
});

User.hasMany(TokenStore, { foreignKey: "id_user", onDelete: "CASCADE" });
TokenStore.belongsTo(User, { foreignKey: "id_user" });

module.exports = TokenStore;
