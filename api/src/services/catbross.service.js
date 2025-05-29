const Catbross = require("../models/catbross.model");
const logger = require("../config/logger");

const getAllGames = async () => {
  try {
    const games = await Catbross.findAll();
    if (!games.length) {
      logger.warn("⚠️ No hay partidas registradas de Catbross.");
      return [];
    }
    logger.info("ℹ️ Partidas de Catbross obtenidas correctamente.");
    return games;
  } catch (error) {
    logger.error("❌ Error obteniendo partidas de Catbross:", error);
    throw error;
  }
};

const getGameById = async (id_catbross) => {
  try {
    const game = await Catbross.findByPk(id_catbross);
    if (!game) {
      logger.warn(`⚠️ Partida de Catbrosss no encontrada: ID ${id_catbross}`);
      throw new Error(`Partida de Catbross no encontrada para ID ${id_catbross}`);
    }
    logger.info(`ℹ️ Partida de Catbross obtenida: ID ${id_catbross}`);
    return game;
  } catch (error) {
    logger.error(`❌ Error obteniendo partida de Catbross ID ${id_catbross}:`, error);
    throw error;
  }
};

const getGamesByUser = async (id_user) => {
  try {
    const games = await Catbross.findAll({ where: { id_user } });
    if (!games.length) {
      logger.warn(`⚠️ No se encontraron partidas al Catbross del usuario ID ${id_user}`);
      return [];
    }
    logger.info(`ℹ️ Partidas obtenidas al Catbross para el usuario ID ${id_user}`);
    return games;
  } catch (error) {
    logger.error(`❌ Error obteniendo partidas al Catbross del usuario ID ${id_user}:`, error);
    throw error;
  }
};

const createGame = async ({ id_user, completed_stages, time_left, uso_coins_obtained }) => {
  try {
    const game = await Catbross.create({ id_user, completed_stages, time_left, uso_coins_obtained });
    logger.info(`ℹ️ Partida de Catbross creada: Usuario ID ${id_user}, Etapas completadas: ${completed_stages}, Tiempo restante: ${time_left}, Uso Coins: ${uso_coins_obtained}`);
    return game;
  } catch (error) {
    logger.error("❌ Error creando partida de Catbross:", error);
    throw error;
  }
};

const updateGame = async (id_catbross, newData) => {
  try {
    const game = await Catbross.findByPk(id_catbross);
    if (!game) {
      logger.warn(`⚠️ Partida no encontrada para actualizar: ID ${id_catbross}`);
      return null;
    }
    await game.update({
      ...newData,
      completed_stages: newData.completed_stages ?? game.completed_stages,
      time_left: newData.time_left ?? game.time_left,
      uso_coins_obtained: newData.uso_coins_obtained ?? game.uso_coins_obtained,
    });
    logger.info(`ℹ️ Partida actualizada: ID ${id_catbross}`);
    return game;
  } catch (error) {
    logger.error(`❌ Error actualizando partida ID ${id_catbross}:`, error);
    throw error;
  }
};

const deleteGame = async (id_catbross) => {
  try {
    const game = await Catbross.findByPk(id_catbross);
    if (!game) {
      logger.warn(`⚠️ Partida de Catbross no encontrada para eliminar: ID ${id_catbross}`);
      return null;
    }
    await game.destroy();
    logger.info(`ℹ️ Partida de Catbross eliminada: ID ${id_catbross}`);
    return { message: "✅ Partida de Catbross eliminada satisfactoriamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando partida de Catbross ID ${id_catbross}:`, error);
    throw error;
  }
};

module.exports = { getAllGames, getGameById, getGamesByUser, createGame, updateGame, deleteGame };
