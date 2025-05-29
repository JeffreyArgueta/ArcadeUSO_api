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

const getGameById = async (req, res) => {
  try {
    const { id_catbross } = req.params;
    if (!id_catbross) {
      return res.status(400).json({ error: "⚠️ ID de partida de Catbross es obligatorio." });
    }
    const game = await CatbrossService.getGameById(id_catbross);
    if (!game) {
      return res.status(404).json({ error: `⚠️ Partida de Catbross no encontrada: ID ${id_catbross}` });
    }
    res.status(200).json(game);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partida de Catbross");
  }
};

const getGamesByUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    if (!id_user) {
      return res.status(400).json({ error: "⚠️ ID de usuario es obligatorio." });
    }
    const games = await CatbrossService.getGamesByUser(id_user);
    res.status(200).json(games);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partidas de Catbross del usuario");
  }
};

const createGame = async (req, res) => {
  try {
    const { id_user, completed_stages, time_left, uso_coins_obtained } = req.body;
    if (!id_user || completed_stages == null || time_left == null || uso_coins_obtained == null) {
      return res.status(400).json({ error: "⚠️ ID de usuario, etapas completadas, tiempo y uso coins son obligatorios." });
    }
    const newGame = await CatbrossService.createGame({ id_user, completed_stages, time_left, uso_coins_obtained });
    res.status(201).json(newGame);
  } catch (error) {
    errorHandler(res, error, "Error creando partida de Catbross");
  }
};

const updateGame = async (req, res) => {
  try {
    const { id_catbross } = req.params;
    const newData = req.body;
    if (!id_catbross || !newData) {
      return res.status(400).json({ error: "⚠️ ID de partida de Catbross y datos de actualización son obligatorios." });
    }
    const updatedGame = await CatbrossService.updateGame(id_catbross, newData);
    if (!updatedGame) {
      return res.status(404).json({ error: `⚠️ Partida de Catbross no encontrada para actualizar: ID ${id_catbross}` });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    errorHandler(res, error, "Error actualizando partida de Catbross");
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id_catbross } = req.params;
    if (!id_catbross) {
      return res.status(400).json({ error: "⚠️ ID de partida de Catbross es obligatorio." });
    }
    const deletedGame = await CatbrossService.deleteGame(id_catbross);
    if (!deletedGame) {
      return res.status(404).json({ error: `⚠️ Partida de Catbross no encontrada para eliminar: ID ${id_catbross}` });
    }
    res.status(200).json(deletedGame);
  } catch (error) {
    errorHandler(res, error, "Error eliminando partida de Catbross");
  }
};

module.exports = { getAllGames, getGameById, getGamesByUser, createGame, updateGame, deleteGame };
