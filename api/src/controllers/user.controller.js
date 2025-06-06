const UserService = require("../services/user.service");
const errorHandler = require("../middlewares/errorHandler.middleware");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo usuarios");
  }
};

const getUserById = async (req, res) => {
  try {
    const { id_user } = req.params;
    if (!id_user) {
      return res.status(400).json({ error: "⚠️ El ID de usuario es obligatorio." });
    }
    const user = await UserService.getUserById(id_user);
    if (!user) {
      return res.status(404).json({ error: `⚠️ Usuario no encontrado: ID ${id_user}` });
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo usuario por ID");
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: "⚠️ Username es obligatorio." });
    }
    const user = await UserService.getUserByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo usuario por username");
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ error: "⚠️ Email es obligatorio." });
    }
    const user = await UserService.getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo usuario por email");
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.username || !userData.email || !userData.authentication_method) {
      return res.status(400).json({ error: "⚠️ Nombre de usuario, email y método de autenticación son obligatorios." });
    }
    const newUser = await UserService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    errorHandler(res, error, "Error creando usuario");
  }
}

const updateUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    const newData = req.body;
    if (!id_user || !newData) {
      return res.status(400).json({ error: "⚠️ ID de usuario y datos de actualización son obligatorios." });
    }
    const updatedUser = await UserService.updateUser(id_user, newData);
    res.status(200).json(updatedUser);
  } catch (error) {
    errorHandler(res, error, "Error actualizando usuario");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    if (!id_user) {
      return res.status(400).json({ error: "⚠️ ID de usuario es obligatorio." });
    }
    const deletedUser = await UserService.deleteUser(id_user);
    res.status(200).json(deletedUser);
  } catch (error) {
    errorHandler(res, error, "Error eliminando usuario");
  }
};

const getTopLeaderboard = async (req, res) => {
  try {
    const topUsers = await UserService.getTopLeaderboard();
    res.status(200).json(topUsers);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo el leaderboard");
  }
};

module.exports = { getAllUsers, getUserById, getUserByUsername, getUserByEmail, createUser, updateUser, deleteUser, getTopLeaderboard };
