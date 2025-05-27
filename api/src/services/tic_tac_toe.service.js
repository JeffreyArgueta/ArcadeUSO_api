// services/tic_tac_toe.service.js
const TicTacToeGame = require("../models/tic_tac_toe_game.model");
const TicTacToeSave = require("../models/tic_tac_toe_save.model");
const logger = require("../config/logger");

const getSavesByUser = async (id_user) => {
  try {
    const save = await TicTacToeSave.findByPk(id_user);
    if (!save) {
      logger.warn(`⚠️ No hay partida guardada para el usuario ${id_user}`);
      return null;
    }
    logger.info(`ℹ️ Partida guardada obtenida para el usuario ${id_user}`);
    return save;
  } catch (error) {
    logger.error(`❌ Error al obtener partida guardada para el usuario ${id_user}:`, error);
    throw error;
  }
};

const saveOrUpdateGame = async (data) => {
  try {
    const existing = await TicTacToeSave.findByPk(data.id_user);
    if (existing) {
      await existing.update(data);
      logger.info(`♻️ Partida actualizada para el usuario ${data.id_user}`);
      return existing;
    }
    const created = await TicTacToeSave.create(data);
    logger.info(`✅ Partida guardada para el usuario ${data.id_user}`);
    return created;
  } catch (error) {
    logger.error("❌ Error guardando partida de Tic Tac Toe:", error);
    throw error;
  }
};

const deleteSave = async (id_user) => {
  try {
    const save = await TicTacToeSave.findByPk(id_user);
    if (!save) {
      logger.warn(`⚠️ No hay partida para eliminar del usuario ${id_user}`);
      return null;
    }
    await save.destroy();
    logger.info(`🗑️ Partida eliminada para el usuario ${id_user}`);
    return { message: "✅ Partida eliminada correctamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando partida guardada del usuario ${id_user}:`, error);
    throw error;
  }
};

const createHistory = async (data) => {
  try {
    const game = await TicTacToeGame.create(data);
    logger.info(`📦 Partida guardada en historial para el usuario ${data.id_user}`);
    return game;
  } catch (error) {
    logger.error("❌ Error guardando historial de partida Tic Tac Toe:", error);
    throw error;
  }
};

const getHistoryByUser = async (id_user) => {
  try {
    const games = await TicTacToeGame.findAll({ where: { id_user } });
    if (!games.length) {
      logger.warn(`⚠️ El usuario ${id_user} no tiene historial de partidas.`);
    } else {
      logger.info(`ℹ️ Historial del usuario ${id_user} obtenido.`);
    }
    return games;
  } catch (error) {
    logger.error(`❌ Error obteniendo historial del usuario ${id_user}:`, error);
    throw error;
  }
};

module.exports = {
  getSavesByUser,
  saveOrUpdateGame,
  deleteSave,
  createHistory,
  getHistoryByUser,
};
