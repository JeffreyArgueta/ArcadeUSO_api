const ChatService = require("../services/chat.service")
const errorHandler = require("../middlewares/errorHandler.middleware");

const getAllMessages = async (req, res) => {
  try {
    const messages = await ChatService.getAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo mensajes del chat");
  }
};

const getMessagesByUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    if (!id_user) {
      return res.status(400).json({ error: "⚠️ El ID de usuario es obligatorio." });
    }
    const messages = await ChatService.getMessagesByUser(id_user);
    res.status(200).json(messages);
  } catch (error) {
    errorHandler(res, error, "Error obteniendo mensajes del usuario");
  }
};

const createMessage = async (req, res) => {
  try {
    const { id_user, message, message_type } = req.body;
    if (!id_user || !message || !message_type) {
      return res.status(400).json({ error: "⚠️ ID de usuario, mensaje y tipo son obligatorios." });
    }
    const newMessage = await ChatService.createMessage({ id_user, message, message_type });
    res.status(201).json(newMessage);
  } catch (error) {
    errorHandler(res, error, "Error creando mensaje");
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id_chat } = req.params;
    const newData = req.body;
    if (!id_chat || !newData) {
      return res.status(400).json({ error: "⚠️ ID de mensaje y datos de actualización son obligatorios." });
    }
    const updatedMessage = await ChatService.updateMessage(id_chat, newData);
    if (!updatedMessage) {
      return res.status(404).json({ error: `⚠️ Mensaje no encontrado: ID ${id_chat}` });
    }
    res.status(200).json(updatedMessage);
  } catch (error) {
    errorHandler(res, error, "Error actualizando mensaje");
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id_chat } = req.params;
    if (!id_chat) {
      return res.status(400).json({ error: "⚠️ ID de mensaje es obligatorio." });
    }
    const deletedMessage = await ChatService.deleteMessage(id_chat);
    if (!deletedMessage) {
      return res.status(404).json({ error: `⚠️ Mensaje no encontrado para eliminar: ID ${id_chat}` });
    }
    res.status(200).json(deletedMessage);
  } catch (error) {
    errorHandler(res, error, "Error eliminando mensaje");
  }
};

module.exports = { getAllMessages, getMessagesByUser, createMessage, updateMessage, deleteMessage };
