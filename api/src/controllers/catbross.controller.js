const CatbrossService = require("../services/catbross.service");
const errorHandler = require("../middlewares/errorHandler.middleware");

const getAllGames = async (req, res) => {
  try {
    const games = await CatbrossService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partidas al catbross");
  }
};

const getGamesByUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    if (!id_user) {
      return res.status(400).json({ error: "⚠️ El ID de usuario es obligatorio." });
    }
    const games = await CatbrossService.getGamesByUser(id_user);
    res.status(200).json(games);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partidas del usuario");
  }
};

const createGame = async (req, res) => {
  try {
    const { id_user, completed_stages, time_left, uso_coins_obtained } = req.body;
    if (!id_user || completed_stages == null || time_left == null || uso_coins_obtained == null) {
      return res.status(400).json({ error: "⚠️ ID de usuario, niveles completados, tiempo y monedas son obligatorios." });
    }
    const newGame = await CatbrossService.createGame({ id_user, completed_stages, time_left, uso_coins_obtained });
    res.status(201).json(newGame);
  } catch (error) {
    errorHandler(res, error, "Error creando partida al catbross");
  }
};

const updateGame = async (req, res) => {
  try {
    const { id_catbross } = req.params;
    const newData = req.body;
    if (!id_catbross || !newData) {
      return res.status(400).json({ error: "⚠️ ID de partida y datos de actualización son obligatorios." });
    }
    const updatedGame = await CatbrossService.updateGame(id_catbross, newData);
    if (!updatedGame) {
      return res.status(404).json({ error: `⚠️ Partida no encontrada para actualizar: ID ${id_catbross}` });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    errorHandler(res, error, "Error actualizando partida al catbross");
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id_catbross } = req.params;
    if (!id_catbross) {
      return res.status(400).json({ error: "⚠️ ID de partida es obligatorio." });
    }
    const deletedGame = await CatbrossService.deleteGame(id_catbross);
    if (!deletedGame) {
      return res.status(404).json({ error: `⚠️ Partida no encontrada para eliminar: ID ${id_catbross}` });
    }
    res.status(200).json(deletedGame);
  } catch (error) {
    errorHandler(res, error, "Error eliminando partida al catbross");
  }
};

module.exports = { getAllGames, getGamesByUser, createGame, updateGame, deleteGame };
