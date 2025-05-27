const Minesweeper = require("../models/minesweeper.model");
const logger = require("../config/logger");

const getAllGames = async () => {
  try {
    const games = await Minesweeper.findAll();
    if (!games.length) {
      logger.warn("⚠️ No hay partidas de Minesweeper registradas.");
    } else {
      logger.info("ℹ️ Partidas de Minesweeper obtenidas.");
    }
    return games;
  } catch (error) {
    logger.error("❌ Error obteniendo partidas de Minesweeper:", error);
    throw error;
  }
};

const getGameById = async (id_mine) => {
  try {
    const game = await Minesweeper.findByPk(id_mine);
    if (!game) {
      logger.warn(`⚠️ Partida no encontrada: ID ${id_mine}`);
      return null;
    }
    logger.info(`ℹ️ Partida obtenida: ID ${id_mine}`);
    return game;
  } catch (error) {
    logger.error(`❌ Error al obtener partida ID ${id_mine}:`, error);
    throw error;
  }
};

const getGamesByUser = async (id_user) => {
  try {
    const games = await Minesweeper.findAll({ where: { id_user } });
    if (!games.length) {
      logger.warn(`⚠️ El usuario ${id_user} no tiene partidas registradas.`);
    } else {
      logger.info(`ℹ️ Partidas del usuario ${id_user} obtenidas.`);
    }
    return games;
  } catch (error) {
    logger.error(`❌ Error obteniendo partidas del usuario ${id_user}:`, error);
    throw error;
  }
};

const createGame = async (data) => {
  try {
    const game = await Minesweeper.create(data);
    logger.info(`✅ Partida de Minesweeper registrada para el usuario ${data.id_user}`);
    return game;
  } catch (error) {
    logger.error("❌ Error creando partida de Minesweeper:", error);
    throw error;
  }
};

const deleteGame = async (id_mine) => {
  try {
    const game = await Minesweeper.findByPk(id_mine);
    if (!game) {
      logger.warn(`⚠️ Partida no encontrada para eliminar: ID ${id_mine}`);
      return null;
    }
    await game.destroy();
    logger.info(`✅ Partida eliminada: ID ${id_mine}`);
    return { message: "✅ Partida eliminada correctamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando partida ID ${id_mine}:`, error);
    throw error;
  }
};

module.exports = {
  getAllGames,
  getGameById,
  getGamesByUser,
  createGame,
  deleteGame,
};
