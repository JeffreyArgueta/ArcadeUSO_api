require("dotenv").config();
const { Sequelize } = require("sequelize");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = process.env.DB_DIALECT;

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: console.log
  }
);

sequelize.authenticate()
  .then(() => console.log("✅ Conectado a MySQL satisfactoriamente"))
  .catch(err => console.error("❌ Error en la conexion:", err));

module.exports = sequelize;
