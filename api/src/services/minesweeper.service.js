const Minesweeper = require("../models/minesweeper.model");
const logger = require("../config/logger");

const getAllGames = async () => {
  try {
    const games = await Minesweeper.findAll();
    if (!games.length) {
      logger.warn("⚠️ No hay partidas al buscaminas registradas.");
      return [];
    }
    logger.info("ℹ️ Partidas al buscaminas obtenidas.");
    return games;
  } catch (error) {
    logger.error("❌ Error obteniendo partidas al buscaminas:", error);
    throw error;
  }
};

const getGameById = async (id_mine) => {
  try {
    const game = await Minesweeper.findByPk(id_mine);
    if (!game) {
      logger.warn(`⚠️ Partida al buscaminas no encontrada: ID ${id_mine}`);
      return null;
    }
    logger.info(`ℹ️ Partida al buscaminas obtenida: ID ${id_mine}`);
    return game;
  } catch (error) {
    logger.error(`❌ Error al obtener partida al buscaminas ID ${id_mine}:`, error);
    throw error;
  }
};

const getGamesByUser = async (id_user) => {
  try {
    const games = await Minesweeper.findAll({ where: { id_user } });
    if (!games.length) {
      logger.warn(`⚠️ No se encontraron partidas al buscaminas del usuario: ID ${id_user}`);
      return [];
    }
    logger.info(`ℹ️ Partidas al buscaminas obtenidas para el usuario: ID ${id_user}`);
    return games;
  } catch (error) {
    logger.error(`❌ Error obteniendo partidas al buscaminas del usuario ID ${id_user}:`, error);
    throw error;
  }
};

const createGame = async ({ id_user, uso_coins_earned, won }) => {
  try {
    const game = await Minesweeper.create({ id_user, uso_coins_earned, won });
    logger.info(`ℹ️ Partida al buscaminas creada: Usuario ID ${id_user}, Ganó: ${won}, Uso Coins: ${uso_coins_earned}`);
    return game;
  } catch (error) {
    logger.error("❌ Error creando partida al buscaminas:", error);
    throw error;
  }
};

const updateGame = async (id_mine, newData) => {
  try {
    const game = await Minesweeper.findByPk(id_mine);
    if (!game) {
      logger.warn(`⚠️ Partida al buscaminas no encontrada para actualizar: ID ${id_mine}`);
      return null;
    }
    await game.update({
      ...newData,
      uso_coins_earned: newData.uso_coins_earned ?? game.uso_coins_earned,
      won: newData.won ?? game.won,
    });
    logger.info(`ℹ️ Partida al buscaminas actualizada: ID ${id_mine}`);
    return game;
  } catch (error) {
    logger.error(`❌ Error actualizando partida al buscaminas ID ${id_mine}:`, error);
    throw error;
  }
};

const deleteGame = async (id_mine) => {
  try {
    const game = await Minesweeper.findByPk(id_mine);
    if (!game) {
      logger.warn(`⚠️ Partida al buscaminas no encontrada para eliminar: ID ${id_mine}`);
      return null;
    }
    await game.destroy();
    logger.info(`ℹ️ Partida al buscaminas eliminada: ID ${id_mine}`);
    return { message: "✅ Partida al buscaminas eliminada satisfactoriamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando partida al buscaminas ID ${id_mine}:`, error);
    throw error;
  }
};

module.exports = { getAllGames, getGameById, getGamesByUser, createGame, updateGame, deleteGame };
