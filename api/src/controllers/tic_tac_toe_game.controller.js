const TicTacToeGameService = require("../services/tic_tac_toe_game.service");
const errorHandler = require("../middlewares/errorHandler.middleware");

const getAllGames = async (req, res) => {
  try {
    const games = await TicTacToeGameService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partidas al X0");
  }
};

const getGamesByUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    if (!id_user) {
      return res.status(400).json({ error: "⚠️ El ID de usuario es obligatorio." });
    }
    const games = await TicTacToeGameService.getGamesByUser(id_user);
    res.status(200).json(games);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partidas al X0 del usuario");
  }
};

const createGame = async (req, res) => {
  try {
    const { id_user, difficulty, symbol, result, uso_coins_earned, rounds_played } = req.body;
    if (!id_user || difficulty == null || symbol == null || result == null || uso_coins_earned == null || rounds_played == null) {
      return res.status(400).json({ error: "⚠️ ID de usuario, dificultad, símbolo, monedas y rondas son obligatorios." });
    }
    const newGame = await TicTacToeGameService.createGame({ id_user, difficulty, symbol, result, uso_coins_earned, rounds_played });
    res.status(201).json(newGame);
  } catch (error) {
    errorHandler(res, error, "Error creando partida al X0");
  }
};

const updateGame = async (req, res) => {
  try {
    const { id_game } = req.params;
    const newData = req.body;
    if (!id_game || !newData) {
      return res.status(400).json({ error: "⚠️ ID de partida al X0 y datos de actualización son obligatorios." });
    }
    const updatedGame = await TicTacToeGameService.updateGame(id_game, newData);
    if (!updatedGame) {
      return res.status(404).json({ error: `⚠️ Partida al X0 no encontrada para actualizar: ID ${id_game}` });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    errorHandler(res, error, "Error actualizando partida al X0");
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id_game } = req.params;
    if (!id_game) {
      return res.status(400).json({ error: "⚠️ ID de partida al X0 es obligatorio." });
    }
    const deletedGame = await TicTacToeGameService.deleteGame(id_game);
    if (!deletedGame) {
      return res.status(404).json({ error: `⚠️ Partida al X0 no encontrada para eliminar: ID ${id_game}` });
    }
    res.status(200).json(deletedGame);
  } catch (error) {
    errorHandler(res, error, "Error eliminando partida al X0");
  }
};

const getLeaderboardGame = async (req, res) => {
  try {
    const result = await TicTacToeGameService.getLeaderboardGame();
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo leaderboard de X0");
  }
};

module.exports = { getAllGames, getGamesByUser, createGame, updateGame, deleteGame, getLeaderboardGame };
