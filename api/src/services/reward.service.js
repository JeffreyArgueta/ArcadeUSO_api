const Reward = require("../models/reward.model");
const logger = require("../config/logger");

const getAllRewards = async () => {
  try {
    const rewards = await Reward.findAll();
    if (!rewards.length) {
      logger.warn("⚠️ No hay recompensas registradas.");
      return [];
    }
    logger.info("ℹ️ Recompensas obtenidas");
    return rewards;
  } catch (error) {
    logger.error("❌ Error obteniendo las recompensas:", error);
    throw error;
  }
};

const getRewardById = async (id_reward) => {
  try {
    const reward = await Reward.findByPk(id_reward);
    if (!reward) {
      logger.warn(`⚠️ Recompensa no encontrada: ID ${id_reward}`);
      return [];
    }
    logger.info(`ℹ️ Recompensa obtenida: ID ${id_reward}`);
    return reward;
  } catch (error) {
    logger.error(`❌ Error al obtener recompensa: ID ${id_reward}:`, error);
    throw error;
  }
};

const getRewardsByRarity = async (rarity) => {
  try {
    const reward = await Reward.findAll({ where: { rarity } });
    if (!reward.length) {
      logger.warn(`⚠️ Recompensa no encontrada: Rareza ${rarity}`);
      return [];
    }
    logger.info(`ℹ️ Recompensa obtenida: Rareza ${rarity}`);
    return reward;
  } catch (error) {
    logger.error(`❌ Error al obtener recompensa Rareza ${rarity}: `, error);
    throw error;
  }
};

const createReward = async (rewardData) => {
  try {
    const reward = await Reward.create(rewardData);
    logger.info(`ℹ️ Recompensa creada: ID ${reward.id_reward}, Rarity: ${reward.rarity}`);
    return reward;
  } catch (error) {
    logger.error("❌ Error al crear recompensa:", error);
    throw error;
  }
};

const updateReward = async (id_reward, newData) => {
  try {
    const reward = await Reward.findByPk(id_reward);
    if (!reward) {
      logger.warn(`⚠️ Recompensa no encontrada para actualizar: ID ${id_reward}`);
      return null;
    }
    await reward.update({
      ...newData,
      chance: newData.chance ?? reward.chance,
      daro_points_value: newData.daro_points_value ?? reward.daro_points_value
    });
    logger.info(`ℹ️ Recompensa actualizada: ID ${id_reward}`);
    return reward;
  } catch (error) {
    logger.error(`❌ Error actualizando recompensa ID ${id_reward}:`, error);
    throw error;
  }
};

const deleteReward = async (id_reward) => {
  try {
    const reward = await Reward.findByPk(id_reward);
    if (!reward) {
      logger.warn(`⚠️ Recompensa no encontrada para eliminar: ID ${id_reward}`);
      return null;
    }
    await reward.destroy();
    logger.info(`ℹ️ Recompensa eliminada: ID ${id_reward}`);
    return { message: "✅ Recompensa eliminada satisfactoriamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando recompensa ID ${id_reward}:`, error);
    throw error;
  }
};

module.exports = { getAllRewards, getRewardById, getRewardsByRarity, createReward, updateReward, deleteReward };
