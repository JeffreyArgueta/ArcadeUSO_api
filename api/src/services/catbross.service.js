const Catbross = require("../models/catbross.model");
const logger = require("../config/logger");

const getAllGames = async () => {
  try {
    const games = await Catbross.findAll();
    if (!games.length) {
      logger.warn("⚠️ No hay partidas al catbross registrados.");
      return [];
    }
    logger.info("ℹ️ Partidas al catbross obtenidas");
    return games;
  } catch (error) {
    logger.error("❌ Error obteniendo partidas al catbross:", error);
    throw error;
  }
};

const getGamesByUser = async (id_user) => {
  try {
    const games = await Catbross.findAll({ where: { id_user } });
    if (!games.length) {
      logger.warn(`⚠️ No se encontraron partidas al catbross del usuario: ID ${id_user}`);
      return [];
    }
    logger.info(`ℹ️ Partidas al catbross obtenidas del usuario: ID ${id_user}`);
    return games;
  } catch (error) {
    logger.error(`❌ Error al obtener partidas al catbross del ususario: ID ${id_user}:`, error);
    throw error;
  }
};

const createGame = async ({ id_user, completed_stages, time_left, uso_coins_obtained }) => {
  try {
    const game = await Catbross.create({ id_user, completed_stages, time_left, uso_coins_obtained });
    logger.info(`ℹ️ Nueva partida al catbross creada: Usuario ID ${id_user}, Niveles Completados: ${completed_stages}`);
    return game;
  } catch (error) {
    logger.error("❌ Error creando partida al catbross:", error);
    throw error;
  }
};

const updateGame = async (id_catbross, newData) => {
  try {
    const game = await Catbross.findByPk(id_catbross);
    if (!game) {
      logger.warn(`⚠️ Partida al catbross no encontrada para actualizar: ID ${id_catbross}`);
      return null;
    }
    await game.update({
      ...newData,
      completed_stages: newData.completed_stages ?? game.completed_stages,
      time_left: newData.time_left ?? game.time_left,
      uso_coins_obtained: newData.uso_coins_obtained ?? game.uso_coins_obtained
    });
    logger.info(`ℹ️ Partida al catbross actualizada: ID ${id_catbross}`);
    return game;
  } catch (error) {
    logger.error(`❌ Error actualizando partida al catbross ID ${id_catbross}:`, error);
    throw error;
  }
};

const deleteGame = async (id_catbross) => {
  try {
    const game = await Catbross.findByPk(id_catbross);
    if (!game) {
      logger.warn(`⚠️ Partida al catbross no encontrada para eliminar: ID ${id_catbross}`);
      return null;
    }
    await game.destroy();
    logger.info(`ℹ️ Partida al catbross eliminada: ID ${id_catbross}`);
    return { message: "✅ Partida al catbross eliminada satisfactoriamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando partida al catbross ID ${id_catbross}:`, error);
    throw error;
  }
};

module.exports = { getAllGames, getGamesByUser, createGame, updateGame, deleteGame };
