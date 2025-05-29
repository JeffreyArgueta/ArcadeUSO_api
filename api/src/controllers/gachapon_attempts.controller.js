const GachaponAttemptsService = require("../services/gachapon_attempts.service");
const errorHandler = require("../middlewares/errorHandler.middleware");

const getAllAttempts = async (req, res) => {
  try {
    const attempts = await GachaponAttemptsService.getAllAttempts();
    res.status(200).json(attempts);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo intentos al gachapon");
  }
};

const getAttemptsByUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    if (!id_user) {
      return res.status(400).json({ error: "⚠️ El ID de usuario es obligatorio." });
    }
    const attempts = await GachaponAttemptsService.getAttemptsByUser(id_user);
    res.status(200).json(attempts);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo intentos al gachapon del usuario");
  }
};

const createAttempt = async (req, res) => {
  try {
    const { id_user, id_reward } = req.body;
    if (!id_user || !id_reward) {
      return res.status(400).json({ error: "⚠️ ID de usuario y recompensa son obligatorios." });
    }
    const newAttempt = await GachaponAttemptsService.createAttempt({ id_user, id_reward });
    res.status(201).json(newAttempt);
  } catch (error) {
    errorHandler(res, error, "Error creando intento al gachapon");
  }
};

const updateAttempt = async (req, res) => {
  try {
    const { id_attempt } = req.params;
    const newData = req.body;
    if (!id_attempt || !newData) {
      return res.status(400).json({ error: "⚠️ ID de intento al gachapon y datos de actualización son obligatorios." });
    }
    const updatedAttempt = await GachaponAttemptsService.updateAttempt(id_attempt, newData);
    if (!updatedAttempt) {
      return res.status(404).json({ error: `⚠️ Intento no encontrado: ID ${id_attempt}` });
    }
    res.status(200).json(updatedAttempt);
  } catch (error) {
    errorHandler(res, error, "Error actualizando intento al gachapon");
  }
};

const deleteAttempt = async (req, res) => {
  try {
    const { id_attempt } = req.params;
    if (!id_attempt) {
      return res.status(400).json({ error: "⚠️ ID de intento al gachapon es obligatorio." });
    }
    const deletedAttempt = await GachaponAttemptsService.deleteAttempt(id_attempt);
    if (!deletedAttempt) {
      return res.status(404).json({ error: `⚠️ Intento al gachapon no encontrado para eliminar: ID ${id_attempt}` });
    }
    res.status(200).json(deletedAttempt);
  } catch (error) {
    errorHandler(res, error, "Error eliminando intento al gachapon");
  }
};

module.exports = { getAllAttempts, getAttemptsByUser, createAttempt, updateAttempt, deleteAttempt };
