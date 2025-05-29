const GachaponAttempts = require("../models/gachapon_attempts.model");
const Reward = require("../models/reward.model");
const logger = require("../config/logger");

const getAllAttempts = async () => {
  try {
    const attempts = await GachaponAttempts.findAll();
    if (!attempts.length) {
      logger.warn("⚠️ No hay intentos al gachapon.");
      return [];
    }
    logger.info("ℹ️ Intentos al gachapon obtenidos");
    return attempts;
  } catch (error) {
    logger.error("❌ Error obteniendo intentos al gachapon:", error);
    throw error;
  }
};

const getAttemptsByUser = async (id_user) => {
  try {
    const attempts = await GachaponAttempts.findAll({ where: { id_user } });
    if (!attempts.length) {
      logger.warn(`⚠️ No se encontraron intentos al gachapon del usuario: ID ${id_user}`);
      return [];
    }
    logger.info(`ℹ️ Intentos al gachapon obtenidos del usuario: ID ${id_user}`);
    return attempts;
  } catch (error) {
    logger.error(`❌ Error al obtener intentos al gachapon del ususario: ID ${id_user}:`, error);
    throw error;
  }
};

const createAttempt = async ({ id_user, id_reward }) => {
  try {
    const reward = await Reward.findByPk(id_reward);
    if (!reward) {
      logger.warn(`⚠️ Recompensa no encontrada: ID ${id_reward}`);
      throw new Error(`Recompensa no encontrada para ID ${id_reward}`);
    }
    const attempt = await GachaponAttempts.create({ id_user, id_reward, daro_points_value_earned: reward.daro_points_value, });
    logger.info(`ℹ️ Intento al gachapon creado: Usuario ID ${id_user}, Recompensa: ${id_reward}, Daro Points: ${reward.daro_points_value}`);
    return attempt;
  } catch (error) {
    logger.error("❌ Error creando intento al gachapon:", error);
    throw error;
  }
};

const updateAttempt = async (id_attempt, newData) => {
  try {
    const attempt = await GachaponAttempts.findByPk(id_attempt);
    if (!attempt) {
      logger.warn(`⚠️ Intento al gachapon no encontrado para actualizar: ID ${id_attempt}`);
      return null;
    }
    let daro_points_value_earned = attempt.daro_points_value_earned;
    if (newData.id_reward && newData.id_reward !== attempt.id_reward) {
      const reward = await Reward.findByPk(newData.id_reward);
      if (!reward) {
        logger.warn(`⚠️ Recompensa no encontrada: ID ${newData.id_reward}`);
        throw new Error(`Recompensa no encontrada para ID ${newData.id_reward}`);
      }
      daro_points_value_earned = reward.daro_points_value;
    }
    await attempt.update({
      ...newData,
      id_user: newData.id_user ?? attempt.id_user,
      id_reward: newData.id_reward ?? attempt.id_reward,
      daro_points_value_earned,
    });
    logger.info(`ℹ️ Intento al gachapon actualizado: ID ${id_attempt}`);
    return attempt;
  } catch (error) {
    logger.error(`❌ Error actualizando intento al gachapon ID ${id_attempt}:`, error);
    throw error;
  }
};

const deleteAttempt = async (id_attempt) => {
  try {
    const attempt = await GachaponAttempts.findByPk(id_attempt);
    if (!attempt) {
      logger.warn(`⚠️ Intento al gachapon no encontrado para eliminar: ID ${id_attempt}`);
      return null;
    }
    await attempt.destroy();
    logger.info(`ℹ️ Intento al gachapon eliminado: ID ${id_attempt}`);
    return { message: "✅ Intento al gachapon eliminado satisfactoriamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando intento al gachapon ID ${id_attempt}:`, error);
    throw error;
  }
};

module.exports = { getAllAttempts, getAttemptsByUser, createAttempt, updateAttempt, deleteAttempt };
