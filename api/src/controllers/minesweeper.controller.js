const MinesweeperService = require("../services/minesweeper.service");
const errorHandler = require("../middlewares/errorHandler.middleware");

const getAllGames = async (req, res) => {
  try {
    const games = await MinesweeperService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partidas");
  }
};

const getGameById = async (req, res) => {
  try {
    const { id_mine } = req.params;
    if (!id_mine) {
      return res.status(400).json({ error: "⚠️ ID de partida es obligatorio." });
    }
    const game = await MinesweeperService.getGameById(id_mine);
    if (!game) {
      return res.status(404).json({ error: `⚠️ Partida no encontrada: ID ${id_mine}` });
    }
    res.status(200).json(game);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partida por ID");
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
    errorHandler(res, error, "Error obteniendo partidas por usuario");
  }
};

const createGame = async (req, res) => {
  try {
    const data = req.body;
    if (!data.id_user || data.uso_coins_obtained == null || data.won == null) {
      return res.status(400).json({ error: "⚠️ ID de usuario, uso_coins_obtained y resultado (won) son obligatorios." });
    }
    const game = await MinesweeperService.createGame(data);
    res.status(201).json(game);
  } catch (error) {
    errorHandler(res, error, "Error registrando partida");
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id_mine } = req.params;
    if (!id_mine) {
      return res.status(400).json({ error: "⚠️ ID de partida es obligatorio." });
    }
    const result = await MinesweeperService.deleteGame(id_mine);
    if (!result) {
      return res.status(404).json({ error: `⚠️ Partida no encontrada: ID ${id_mine}` });
    }
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error, "Error eliminando partida");
  }
};

module.exports = {
  getAllGames,
  getGameById,
  getGamesByUser,
  createGame,
  deleteGame,
};
