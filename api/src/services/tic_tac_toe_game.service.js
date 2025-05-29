const TicTacToeGame = require("../models/tic_tac_toe_game.model");
const { fn, col } = require("sequelize");
const logger = require("../config/logger");

const getAllGames = async () => {
  try {
    const games = await TicTacToeGame.findAll();
    if (!games.length) {
      logger.warn("⚠️ No hay partidas al X0 registrados.");
      return [];
    }
    logger.info("ℹ️ Partidas al X0 obtenidas");
    return games;
  } catch (error) {
    logger.error("❌ Error obteniendo partidas al X0:", error);
    throw error;
  }
};

const getGamesByUser = async (id_user) => {
  try {
    const games = await TicTacToeGame.findAll({ where: { id_user } });
    if (!games.length) {
      logger.warn(`⚠️ No se encontraron partidas al X0 del usuario: ID ${id_user}`);
      return [];
    }
    logger.info(`ℹ️ Partidas al X0 obtenidas del usuario: ID ${id_user}`);
    return games;
  } catch (error) {
    logger.error(`❌ Error al obtener partidas al X0 del ususario: ID ${id_user}:`, error);
    throw error;
  }
};

const createGame = async ({ id_user, difficulty, symbol, result, uso_coins_earned, rounds_played }) => {
  try {
    const game = await TicTacToeGame.create({ id_user, difficulty, symbol, result, uso_coins_earned, rounds_played });
    logger.info(`ℹ️ Nueva partida al X0 creada: Usuario ID ${id_user}, Resultado: ${result}`);
    return game;
  } catch (error) {
    logger.error("❌ Error creando partida al X0:", error);
    throw error;
  }
};

const updateGame = async (id_game, newData) => {
  try {
    const game = await TicTacToeGame.findByPk(id_game);
    if (!game) {
      logger.warn(`⚠️ Partida al X0 no encontrada para actualizar: ID ${id_game}`);
      return null;
    }
    await game.update({
      ...newData,
      difficulty: newData.difficulty ?? game.difficulty,
      symbol: newData.symbol ?? game.symbol,
      result: newData.result ?? game.result,
      uso_coins_earned: newData.uso_coins_earned ?? game.uso_coins_earned,
      rounds_played: newData.rounds_played ?? game.rounds_played
    });
    logger.info(`ℹ️ Partida al X0 actualizada: ID ${id_game}`);
    return game;
  } catch (error) {
    logger.error(`❌ Error actualizando partida al X0 ID ${id_game}:`, error);
    throw error;
  }
};

const deleteGame = async (id_game) => {
  try {
    const game = await TicTacToeGame.findByPk(id_game);
    if (!game) {
      logger.warn(`⚠️ Partida al X0 no encontrada para eliminar: ID ${id_game}`);
      return null;
    }
    await game.destroy();
    logger.info(`ℹ️ Partida al X0 eliminada: ID ${id_game}`);
    return { message: "✅ Partida al X0 eliminada satisfactoriamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando partida al X0 ID ${id_game}:`, error);
    throw error;
  }
};

const getLeaderboardGame = async () => {
  try {
    const result = await TicTacToeGame.findAll({
      attributes: [
        'id_user',
        [fn('SUM', col('uso_coins_earned')), 'total_uso_coins']
      ],
      group: ['id_user'],
      order: [[fn('SUM', col('uso_coins_earned')), 'DESC']],
      limit: 10
    });

    if (!result.length) {
      logger.warn("⚠️ No hay datos en el leaderboard de X0.");
      return [];
    }

    logger.info("ℹ️ Leaderboard de X0 obtenido exitosamente.");
    return result;
  } catch (error) {
    logger.error("❌ Error obteniendo leaderboard de X0:", error);
    throw error;
  }
};

module.exports = { getAllGames, getGamesByUser, createGame, updateGame, deleteGame, getLeaderboardGame};
