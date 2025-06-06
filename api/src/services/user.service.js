const User = require("../models/user.model");
const { Sequelize, Op } = require("sequelize");
const logger = require("../config/logger");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  try {
    const users = await User.findAll({ attributes: ["id_user", "username", "email"] });
    if (!users.length) {
      logger.warn("⚠️ No hay usuarios registrados.");
      return [];
    }
    logger.info("ℹ️ Usuarios obtenidos");
    return users;
  } catch (error) {
    logger.error("❌ Error obteniendo los usuarios:", error);
    throw error;
  }
};

const getUserById = async (id_user) => {
  try {
    const user = await User.findByPk(id_user);
    if (!user) {
      logger.warn(`⚠️ Usuario no encontrado: ID ${id_user}`)
      return null;
    }
    logger.info(`ℹ️ Usuario obtenido: ID ${id_user}`);
    return user;
  } catch (error) {
    logger.error(`❌ Error al obtener usuario: ID ${id_user}:`, error);
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("username")),
          username.toLowerCase()
        ),
      },
    });
    if (!user) {
      logger.warn(`⚠️ Usuario no encontrado: Username ${username}`);
      return null;
    }
    logger.info(`ℹ️ Usuario obtenido: Username ${username}`);
    return user;
  } catch (error) {
    logger.error(`❌ Error al obtener usuario: Username ${username}:`, error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("email")),
          email.toLowerCase()
        ),
      },
    });
    if (!user) {
      logger.warn(`⚠️ Usuario no encontrado: Correo ${email}`);
      return null;
    }
    logger.info(`ℹ️ Usuario obtenido: Correo ${email}`);
    return user;
  } catch (error) {
    logger.error(`❌ Error al obtener usuario: Correo ${email}:`, error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    if (userData.authentication_method === "manual" && !userData.password) {
      throw new Error("⚠️ La contraseña es obligatoria para el registro.");
    }
    if (userData.authentication_method === "google" && !userData.google_id) {
      throw new Error("⚠️ Google ID es obligatorio para registro con Google.");
    }

    const whereCondition = { email: userData.email };
    if (userData.google_id) {
      whereCondition.google_id = userData.google_id;
    }

    const existingUser = await User.findOne({ where: whereCondition });
    if (existingUser) {
      logger.warn("⚠️ Usuario ya existente");
      return null;
    }

    const userDataToSave = {
      username: userData.username,
      email: userData.email,
      authentication_method: userData.authentication_method,
      role: userData.role || "player",
      uso_coins: userData.uso_coins || 0,
      daro_points: userData.daro_points || 0,
    };

    if (userData.authentication_method === "manual") {
      userDataToSave.password = bcrypt.hashSync(userData.password, 10);
    }
    if (userData.authentication_method === "google") {
      userDataToSave.google_id = userData.google_id;
    }

    const newUser = await User.create(userDataToSave);
    logger.info(`ℹ️ Usuario creado: ${newUser.username}, Correo: ${newUser.email}`);
    return newUser;
  } catch (error) {
    logger.error("❌ Error creando al usuario:", error);
    throw error;
  }
};

const updateUser = async (id_user, newData) => {
  try {
    const user = await User.findByPk(id_user);
    if (!user) {
      logger.warn(`⚠️ Usuario no encontrado para actualizar: ID ${id_user}`);
      return null;
    }

    const filteredData = Object.fromEntries(
      Object.entries(newData).filter(([_, value]) => value !== undefined)
    );

    await user.update(filteredData);

    logger.info(`ℹ️ Usuario actualizado: ID ${id_user}`);
    return user;
  } catch (error) {
    logger.error(`❌ Error actualizando usuario ID ${id_user}:`, error);
    throw error;
  }
};

const deleteUser = async (id_user) => {
  try {
    const user = await User.findByPk(id_user);
    if (!user) {
      logger.warn(`⚠️ Usuario no encontrado para eliminar: ID ${id_user}`);
      return null;
    }
    await user.destroy();
    logger.info(`ℹ️ Usuario eliminado: ID ${id_user}`);
    return { message: "✅ Usuario eliminado satisfactoriamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando usuario ID ${id_user}:`, error);
    throw error;
  }
};

const getTopLeaderboard = async () => {
  try {
    const topUsers = await User.findAll({
      attributes: ["id_user", "username", "daro_points"],
      order: [["daro_points", "DESC"]],
      limit: 10, // 🔥 Solo los 10 con más puntos
    });

    if (!topUsers.length) {
      logger.warn("⚠️ No hay suficientes usuarios para el leaderboard.");
      return [];
    }

    logger.info("ℹ️ Leaderboard generado correctamente");
    return topUsers;
  } catch (error) {
    logger.error("❌ Error obteniendo el leaderboard:", error);
    throw error;
  }
};

module.exports = { getAllUsers, getUserById, getUserByUsername, getUserByEmail, createUser, updateUser, deleteUser, getTopLeaderboard };
