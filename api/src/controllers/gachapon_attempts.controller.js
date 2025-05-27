const GachaponService = require("../services/gachapon_attempts.service");
const errorHandler = require("../middlewares/errorHandler.middleware");

const getAllAttempts = async (req, res) => {
  try {
    const attempts = await GachaponService.getAllAttempts();
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
    const attempts = await GachaponService.getAttemptsByUser(id_user);
    res.status(200).json(attempts);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo intentos del usuario");
  }
};

const createAttempt = async (req, res) => {
  try {
    const { id_user, id_reward, daro_points_value_earned } = req.body;
    if (!id_user || !id_reward || daro_points_value_earned == null) {
      return res.status(400).json({ error: "⚠️ ID de usuario, recompensa y puntos ganados son obligatorios." });
    }
    const newAttempt = await GachaponService.createAttempt({ id_user, id_reward, daro_points_value_earned });
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
      return res.status(400).json({ error: "⚠️ ID de intento y datos de actualización son obligatorios." });
    }
    const updatedAttempt = await GachaponService.updateAttempt(id_attempt, newData);
    if (!updatedAttempt) {
      return res.status(404).json({ error: `⚠️ Intento no encontrado para actualizar: ID ${id_attempt}` });
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
      return res.status(400).json({ error: "⚠️ ID de intento es obligatorio." });
    }
    const deletedAttempt = await GachaponService.deleteAttempt(id_attempt);
    if (!deletedAttempt) {
      return res.status(404).json({ error: `⚠️ Intento no encontrado para eliminar: ID ${id_attempt}` });
    }
    res.status(200).json(deletedAttempt);
  } catch (error) {
    errorHandler(res, error, "Error eliminando intento al gachapon");
  }
};

module.exports = { getAllAttempts, getAttemptsByUser, createAttempt, updateAttempt, deleteAttempt };
