const TicTacToeSave = require("../models/tic_tac_toe_save.model");
const logger = require("../config/logger");

const getAllSaves = async () => {
  try {
    const saves = await TicTacToeSave.findAll();
    if (!saves.length) {
      logger.warn("⚠️ No hay partidas al X0 guardadas registradas.");
      return [];
    }
    logger.info("ℹ️ Partidas al X0 guardadas obtenidas");
    return saves;
  } catch (error) {
    logger.error("❌ Error obteniendo partidas guardadas al X0:", error);
    throw error;
  }
};

const getSavesByUser = async (id_user) => {
  try {
    const saves = await TicTacToeSave.findAll({ where: { id_user } });
    if (!saves.length) {
      logger.warn(`⚠️ No se encontraron partidas guardadas al X0 del usuario: ID ${id_user}`);
      return [];
    }
    logger.info(`ℹ️ Partidas guardadas al X0 obtenidas del usuario: ID ${id_user}`);
    return saves;
  } catch (error) {
    logger.error(`❌ Error al obtener partidas guardadas al X0 del ususario: ID ${id_user}:`, error);
    throw error;
  }
};

const createSave = async ({ id_user, board_state, rounds, difficulty, player_symbol, session_uso_coins  }) => {
  try {
    const save = await TicTacToeSave.create({ id_user, board_state, rounds, difficulty, player_symbol, session_uso_coins });
    logger.info(`ℹ️ Nueva partida guardada al X0 creada: Usuario ID ${id_user}`);
    return save;
  } catch (error) {
    logger.error("❌ Error creando partida al X0:", error);
    throw error;
  }
};

const updateSave = async (id_save, newData) => {
  try {
    const save = await TicTacToeSave.findByPk(id_save);
    if (!save) {
      logger.warn(`⚠️ Partida al X0 no encontrada para actualizar: ID ${id_save}`);
      return null;
    }
    await save.update({
      ...newData,
      board_state: newData.board_state ?? save.board_state,
      rounds: newData.rounds ?? save.rounds,
      difficulty: newData.difficulty ?? save.difficulty,
      player_symbol: newData.player_symbol ?? save.player_symbol,
      session_uso_coins: newData.session_uso_coins ?? save.session_uso_coins
    });
    logger.info(`ℹ️ Partida guardada al X0 actualizada: ID ${id_save}`);
    return save;
  } catch (error) {
    logger.error(`❌ Error actualizando partida guardada al X0 ID ${id_save}:`, error);
    throw error;
  }
};

const deleteSave = async (id_save) => {
  try {
    const save = await TicTacToeSave.findByPk(id_save);
    if (!save) {
      logger.warn(`⚠️ Partida gurdada al X0 no encontrada para eliminar: ID ${id_save}`);
      return null;
    }
    await save.destroy();
    logger.info(`ℹ️ Partida guardada al X0 eliminada: ID ${id_save}`);
    return { message: "✅ Partida guardada al X0 eliminada satisfactoriamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando partida guardada al X0 ID ${id_save}:`, error);
    throw error;
  }
};

module.exports = { getAllSaves, getSavesByUser, createSave, updateSave, deleteSave };
