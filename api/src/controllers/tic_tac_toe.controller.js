// controllers/tic_tac_toe.controller.js
const TicTacToeService = require("../services/tic_tac_toe.service");
const errorHandler = require("../middlewares/errorHandler.middleware");
const { Op, fn, col } = require("sequelize");
const TicTacToeGame = require("../models/tic_tac_toe_game.model");

const getPartidaGuardada = async (req, res) => {
  try {
    const id_user = req.user.id;
    const partida = await TicTacToeService.getSavesByUser(id_user);
    if (!partida) {
      return res.status(404).json({ error: "⚠️ No hay partida guardada." });
    }
    res.status(200).json(partida);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo partida guardada");
  }
};

const guardarPartida = async (req, res) => {
  try {
    const id_user = req.user.id;
    const data = { ...req.body, id_user };
    const partida = await TicTacToeService.saveOrUpdateGame(data);
    res.status(200).json(partida);
  } catch (error) {
    errorHandler(res, error, "Error guardando partida");
  }
};

const eliminarPartida = async (req, res) => {
  try {
    const id_user = req.user.id;
    const result = await TicTacToeService.deleteSave(id_user);
    if (!result) {
      return res.status(404).json({ error: "⚠️ No hay partida para eliminar." });
    }
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error, "Error eliminando partida");
  }
};

const guardarHistorial = async (req, res) => {
  try {
    const id_user = req.user.id;
    const data = { ...req.body, id_user };
    const result = await TicTacToeService.createHistory(data);
    res.status(201).json(result);
  } catch (error) {
    errorHandler(res, error, "Error registrando historial de partida");
  }
};

const obtenerHistorialPorUsuario = async (req, res) => {
  try {
    const id_user = req.params.id_user;
    if (!id_user) {
      return res.status(400).json({ error: "⚠️ ID de usuario es obligatorio." });
    }
    const result = await TicTacToeService.getHistoryByUser(id_user);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo historial por usuario");
  }
};

const getTop10Players = async (req, res) => {
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
    res.status(200).json(result);
  } catch (error) {
    errorHandler(res, error, 'Error obteniendo top 10 jugadores');
  }
};

module.exports = {
  getPartidaGuardada,
  guardarPartida,
  eliminarPartida,
  guardarHistorial,
  obtenerHistorialPorUsuario,
  getTop10Players,
};
