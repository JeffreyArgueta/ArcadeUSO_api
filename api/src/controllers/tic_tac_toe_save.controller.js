const TicTacToeSaveService = require("../services/tic_tac_toe_save.service");
const errorHandler = require("../middlewares/errorHandler.middleware");

const getAllSaves = async (req, res) => {
  try {
    const saves = await TicTacToeSaveService.getAllSaves();
    res.status(200).json(saves);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partidas guardadas al X0");
  }
};

const getSavesByUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    if (!id_user) {
      return res.status(400).json({ error: "⚠️ El ID de usuario es obligatorio." });
    }
    const saves = await TicTacToeSaveService.getSavesByUser(id_user);
    res.status(200).json(saves);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partidas guardadas al X0 del usuario");
  }
};

const createSave = async (req, res) => {
  try {
    const { id_user, board_state, rounds, difficulty, player_symbol, session_uso_coins } = req.body;
    if (!id_user || board_state == null || rounds == null || difficulty == null || player_symbol == null || session_uso_coins == null) {
      return res.status(400).json({ error: "⚠️ ID de usuario, estado, rondas, dificultad, símbolo y monedas son obligatorios." });
    }
    const newSave = await TicTacToeSaveService.createSave({ id_user, board_state, rounds, difficulty, player_symbol, session_uso_coins });
    res.status(201).json(newSave);
  } catch (error) {
    errorHandler(res, error, "Error creando partida guardada al X0");
  }
};

const updateSave = async (req, res) => {
  try {
    const { id_save } = req.params;
    const newData = req.body;
    if (!id_save || !newData) {
      return res.status(400).json({ error: "⚠️ ID de partida guardada al X0 y datos de actualización son obligatorios." });
    }
    const updatedSave = await TicTacToeSaveService.updateSave(id_save, newData);
    if (!updatedSave) {
      return res.status(404).json({ error: `⚠️ Partida guardada al X0 no encontrada para actualizar: ID ${id_save}` });
    }
    res.status(200).json(updatedSave);
  } catch (error) {
    errorHandler(res, error, "Error actualizando partida guardada al X0");
  }
};

const deleteSave = async (req, res) => {
  try {
    const { id_save } = req.params;
    if (!id_save) {
      return res.status(400).json({ error: "⚠️ ID de partida guardada al X0 es obligatoria." });
    }
    const deletedSave = await TicTacToeSaveService.deleteSave(id_save);
    if (!deletedSave) {
      return res.status(404).json({ error: `⚠️ Partida guardada al X0 no encontrada para eliminar: ID ${id_save}` });
    }
    res.status(200).json(deletedSave);
  } catch (error) {
    errorHandler(res, error, "Error eliminando partida guardada al X0");
  }
};

module.exports = { getAllSaves, getSavesByUser, createSave, updateSave, deleteSave };
