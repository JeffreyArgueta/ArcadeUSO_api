const RewardService = require("../services/reward.service");
const errorHandler = require("../middlewares/errorHandler.middleware");

const getAllRewards = async (req, res) => {
  try {
    const rewards = await RewardService.getAllRewards();
    res.status(200).json(rewards);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo recompensas");
  }
};

const getRewardById = async (req, res) => {
  try {
    const { id_reward } = req.params;
    if (!id_reward) {
      return res.status(400).json({ error: "⚠️ El ID de recompensa es obligatoria." });
    }
    const reward = await RewardService.getRewardById(id_reward);
    if (!reward) {
      return res.status(404).json({ error: `⚠️ Recompensa no encontrada: ID ${id_reward}` });
    }
    res.status(200).json(reward);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo recompensa");
  }
};

const getRewardsByRarity = async (req, res) => {
  try {
    const { rarity } = req.params;
    if (!rarity) {
      return res.status(400).json({ error: "⚠️ La rareza es obligatoria." });
    }
    const rewards = await RewardService.getRewardsByRarity(rarity);
    res.status(200).json(rewards);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo recompensas por rareza");
  }
};

const createReward = async (req, res) => {
  try {
    const { rarity, daro_points_value, chance, duration } = req.body;
    if (!rarity == null || !daro_points_value == null || !chance == null || !duration == null) {
      return res.status(400).json({ error: "⚠️ Rareza, daro points, probabilidad y duración son obligatorios." });
    }
    const newReward = await RewardService.createReward({ rarity, daro_points_value, chance, duration });
    res.status(201).json(newReward);
  } catch (error) {
    errorHandler(res, error, "Error creando recompensa");
  }
};

const updateReward = async (req, res) => {
  try {
    const { id_reward } = req.params;
    const newData = req.body;
    if (!id_reward || !newData) {
      return res.status(400).json({ error: "⚠️ ID de recompensa y datos a actualizar son obligatorios." });
    }
    const updatedReward = await RewardService.updateReward(id_reward, newData);
    if (!updatedReward) {
      return res.status(404).json({ error: `⚠️ Recompensa no encontrada para actualizar: ID ${id_reward}` });
    }
    res.status(200).json(updatedReward);
  } catch (error) {
    errorHandler(res, error, "Error actualizando recompensa");
  }
};

const deleteReward = async (req, res) => {
  try {
    const { id_reward } = req.params;
    if (!id_reward) {
      return res.status(400).json({ error: "⚠️ ID de recompensa es obligatorio." });
    }
    const deletedReward = await RewardService.deleteReward(id_reward);
    if (!deletedReward) {
      return res.status(404).json({ error: `⚠️ Recompensa no encontrada para eliminar: ID ${id_reward}` });
    }
    res.status(200).json(deletedReward);
  } catch (error) {
    errorHandler(res, error, "Error eliminando recompensa");
  }
};

module.exports = { getAllRewards, getRewardById, getRewardsByRarity, createReward, updateReward, deleteReward };
