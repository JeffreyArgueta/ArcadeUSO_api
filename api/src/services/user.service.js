const User = require("../models/user.model");
const { Sequelize } = require("sequelize");
const logger = require("../config/logger");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  try {
    const users = await User.findAll({ attributes: ["id_user", "username", "email"] });
    if (!users.length) { logger.warn("⚠️ No hay usuarios registrados."); }
    else { logger.info("ℹ️ Usuarios obtenidos") }
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
      logger.warn(`⚠️ Usuario no encontrado: Username ${username}`)
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
      logger.warn(`⚠️ Usuario no encontrado: Correo ${email}`)
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
    if (userData.authentication_method === 'manual') {
      if (!userData.password) throw new Error("⚠️ La contraseña es obligatoria para el registro.");

      let user = await User.findOne({ where: { email: userData.email } });

      if (user) {
        logger.warn("⚠️ Usuario ya existente");
        return null;
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      user = await User.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        authentication_method: "manual",
        role: userData.role || "player",
        uso_coins: userData.uso_coins || 0,
        daro_points: userData.daro_points || 0
      });

      logger.info(`ℹ️ Usuario creado: Usuario ${user.username}, Correo ${user.email}`);
      return user;
    } else if (userData.authentication_method === "google") {
      if (!userData.google_id) throw new Error("⚠️ Google ID es obligatorio para registro con Google.");

      let user = await User.findOne({ where: { email: userData.email } });

      if (user) {
        logger.warn("⚠️ Usuario Google ya existente");
        return null;
      }

      user = await User.create({
        username: userData.username,
        email: userData.email,
        google_id: userData.google_id,
        authentication_method: "google",
        role: userData.role || "player",
        uso_coins: userData.uso_coins || 0,
        daro_points: userData.daro_points || 0
      });

      logger.info(`ℹ️ Usuario Google creado: ${user.username}, Correo ${user.email}`);
      return user;
    }
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
    await user.update({
      ...newData,
      uso_coins: newData.uso_coins ?? user.uso_coins,
      daro_points: newData.daro_points ?? user.daro_points
    });
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

module.exports = { getAllUsers, getUserById, getUserByUsername, getUserByEmail, createUser, updateUser, deleteUser };
