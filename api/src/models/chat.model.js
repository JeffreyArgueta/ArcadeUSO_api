const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const Chat = sequelize.define("Chat", {
  id_chat: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: User, key: "id_user" }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message_type: {
    type: DataTypes.ENUM("player", "system"),
    allowNull: false,
    defaultValue: "player"
  }
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  tableName: "chat"
});

User.hasMany(Chat, { foreignKey: "id_user", onDelete: "CASCADE" });
Chat.belongsTo(User, { foreignKey: "id_user" });

module.exports = Chat;
