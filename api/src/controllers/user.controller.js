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
      return res.status(400).json({ error: "⚠️ El username es obligatorio." });
    }
    const user = await UserService.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: `⚠️ Usuario no encontrado: Username ${username}` });
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo usuario por username");
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ error: "⚠️ El correo electrónico es obligatorio." });
    }
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: `⚠️ Usuario no encontrado: Correo ${email}` });
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo usuario por correo");
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.username || !userData.email || !userData.authentication_method) {
      return res.status(400).json({ error: "⚠️ Nombre de usuario, correo y método de autenticación son obligatorios." });
    }

    if (userData.authentication_method === "manual" && !userData.password) {
      return res.status(400).json({ error: "⚠️ La contraseña es obligatoria para el registro manual." });
    }

    if (userData.authentication_method === "google" && !userData.google_id) {
      return res.status(400).json({ error: "⚠️ Google ID es obligatorio para el registro con Google." });
    }

    const newUser = await UserService.createUser(userData);
    if (!newUser) {
      return res.status(409).json({ error: "⚠️ Usuario ya existente." });
    }
    res.status(201).json(newUser);
  } catch (error) {
    errorHandler(res, error, "Error creando usuario");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    const newData = req.body;
    if (!id_user || !newData) {
      return res.status(400).json({ error: "⚠️ ID de usuario y datos a actualizar son obligatorios." });
    }
    const updatedUser = await UserService.updateUser(id_user, newData);
    if (!updatedUser) {
      return res.status(404).json({ error: `⚠️ Usuario no encontrado para actualizar: ID ${id_user}` });
    }
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
    if (!deletedUser) {
      return res.status(404).json({ error: `⚠️ Usuario no encontrado para eliminar: ID ${id_user}` });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    errorHandler(res, error, "Error eliminando usuario");
  }
};

module.exports = { getAllUsers, getUserById, getUserByUsername, getUserByEmail, createUser, updateUser, deleteUser };
