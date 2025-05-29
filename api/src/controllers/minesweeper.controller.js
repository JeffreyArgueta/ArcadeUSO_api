const MinesweeperService = require("../services/minesweeper.service");
const errorHandler = require("../middlewares/errorHandler.middleware");

const getAllGames = async (req, res) => {
  try {
    const games = await MinesweeperService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partidas al buscaminas");
  }
};

const getGameById = async (req, res) => {
  try {
    const { id_mine } = req.params;
    if (!id_mine) {
      return res.status(400).json({ error: "⚠️ ID de partida al buscaminas es obligatorio." });
    }
    const game = await MinesweeperService.getGameById(id_mine);
    if (!game) {
      return res.status(404).json({ error: `⚠️ Partida al buscaminas no encontrada: ID ${id_mine}` });
    }
    res.status(200).json(game);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partida del buscaminas por ID");
  }
};

const getGamesByUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    if (!id_user) {
      return res.status(400).json({ error: "⚠️ ID de usuario es obligatorio." });
    }
    const games = await MinesweeperService.getGamesByUser(id_user);
    res.status(200).json(games);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partidas al buscaminas del usuario");
  }
};

const createGame = async (req, res) => {
  try {
    const { id_user, uso_coins_earned, won } = req.body;
    if (!id_user || uso_coins_earned == null || won == null) {
      return res.status(400).json({ error: "⚠️ ID de usuario, uso coins y resultado son obligatorios." });
    }
    const newGame = await MinesweeperService.createGame({ id_user, uso_coins_earned, won });
    res.status(201).json(newGame);
  } catch (error) {
    errorHandler(res, error, "Error creando partida al buscaminas");
  }
};

const updateGame = async (req, res) => {
  try {
    const { id_mine } = req.params;
    const newData = req.body;
    if (!id_mine || !newData) {
      return res.status(400).json({ error: "⚠️ ID de partida y datos de actualización son obligatorios." });
    }
    const updatedGame = await MinesweeperService.updateGame(id_mine, newData);
    if (!updatedGame) {
      return res.status(404).json({ error: `⚠️ Partida al buscaminas no encontrada para actualizar: ID ${id_mine}` });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    errorHandler(res, error, "Error actualizando partida al buscaminas");
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id_mine } = req.params;
    if (!id_mine) {
      return res.status(400).json({ error: "⚠️ ID de partida al buscaminas es obligatorio." });
    }
    const deletedGame = await MinesweeperService.deleteGame(id_mine);
    if (!deletedGame) {
      return res.status(404).json({ error: `⚠️ Partida al buscaminas no encontrada para eliminar: ID ${id_mine}` });
    }
    res.status(200).json(deletedGame);
  } catch (error) {
    errorHandler(res, error, "Error eliminando partida al buscaminas");
  }
};

module.exports = { getAllGames, getGameById, getGamesByUser, createGame, updateGame, deleteGame };
