const Chat = require("../models/chat.model")
const logger = require("../config/logger");

const getAllMessages = async () => {
  try {
    const messages = await Chat.findAll();
    if (!messages.length) {
      logger.warn("⚠️ No hay mensajes registrados.");
      return [];
    }
    logger.info("ℹ️ Mensajes obtenidos correctamente.");
    return messages;
  } catch (error) {
    logger.error("❌ Error obteniendo mensajes:", error);
    throw error;
  }
};

const getMessagesByUser = async (id_user) => {
  try {
    const messages = await Chat.findAll({ where: { id_user } });
    if (!messages.length) {
      logger.warn(`⚠️ No se encontraron mensajes del usuario ID ${id_user}`);
      return [];
    }
    logger.info(`ℹ️ Mensajes obtenidos del usuario ID ${id_user}`);
    return messages;
  } catch (error) {
    logger.error(`❌ Error obteniendo mensajes del usuario ID ${id_user}:`, error);
    throw error;
  }
};

const createMessage = async ({ id_user, message, message_type }) => {
  try {
    const newMessage = await Chat.create({ id_user, message, message_type });
    logger.info(`ℹ️ Nuevo mensaje registrado: Usuario ID ${id_user}, Tipo: ${message_type}`);
    return newMessage;
  } catch (error) {
    logger.error("❌ Error creando mensaje:", error);
    throw error;
  }
};

const updateMessage = async (id_chat, newData) => {
  try {
    const message = await Chat.findByPk(id_chat);
    if (!message) {
      logger.warn(`⚠️ Mensaje no encontrado para actualizar: ID ${id_chat}`);
      return null;
    }
    await message.update({
      ...newData,
      message: newData.message ?? message.message,
      message_type: newData.message_type ?? message.message_type,
    });
    logger.info(`ℹ️ Mensaje actualizado: ID ${id_chat}`);
    return message;
  } catch (error) {
    logger.error(`❌ Error actualizando mensaje ID ${id_chat}:`, error);
    throw error;
  }
};

const deleteMessage = async (id_chat) => {
  try {
    const message = await Chat.findByPk(id_chat);
    if (!message) {
      logger.warn(`⚠️ Mensaje no encontrado para eliminar: ID ${id_chat}`);
      return null;
    }
    await message.destroy();
    logger.info(`ℹ️ Mensaje eliminado: ID ${id_chat}`);
    return { message: "✅ Mensaje eliminado satisfactoriamente" };
  } catch (error) {
    logger.error(`❌ Error eliminando mensaje ID ${id_chat}:`, error);
    throw error;
  }
};

module.exports = { getAllMessages, getMessagesByUser, createMessage, updateMessage, deleteMessage };
