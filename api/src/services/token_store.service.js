const TokenStore = require("../models/token_store.model");
const logger = require("../config/logger");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = async (user) => {
  try {
    const jti = uuidv4();

    if (!user || !user.id_user) {
      throw new Error("⚠️ Usuario inválido. No se puede generar un token.");
    }
    await TokenStore.create({ jti, id_user: user.id_user });

    logger.info(`ℹ️ Token JWT generado para el usuario ID: ${user.id_user}`);

    return jwt.sign({ id_user: user.id_user, email: user.email, role: user.role, jti }, JWT_SECRET, {
      expiresIn: "24h",
    });
  } catch (error) {
    logger.error("❌ Error generando token JWT:", error);
    throw error;
  }
};

const validateToken = async (jti) => {
  try {
    const token = await TokenStore.findOne({
      where: { jti, expires_at: { [Op.gt]: new Date() } },
    });

    if (!token) {
      logger.warn(`⚠️ Token JWT inválido o expirado: JTI ${jti}`);
      return false;
    }

    logger.info(`ℹ️ Token JWT válido: JTI ${jti}`);
    return true;
  } catch (error) {
    logger.error("❌ Error validando token JWT:", error);
    throw error;
  }
};

const revokeToken = async (jti) => {
  try {
    const token = await TokenStore.findOne({ where: { jti } });

    if (!token) {
      logger.warn(`⚠️ Token no encontrado para revocar: JTI ${jti}`);
      return false;
    }

    await token.destroy();
    logger.info(`ℹ️ Token JWT revocado: JTI ${jti}`);

    return true;
  } catch (error) {
    logger.error(`❌ Error revocando token JWT: JTI ${jti}`, error);
    throw error;
  }
};

const cleanExpiredTokens = async () => {
  try {
    const deletedTokens = await TokenStore.destroy({
      where: { expires_at: { [Op.lt]: new Date() } },
    });

    logger.info(`ℹ️ Tokens expirados eliminados: ${deletedTokens} registros`);
  } catch (error) {
    logger.error("❌ Error limpiando tokens expirados:", error);
    throw error;
  }
};

module.exports = { createToken, validateToken, revokeToken, cleanExpiredTokens };
