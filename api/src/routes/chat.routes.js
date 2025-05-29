const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/chat.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, ChatController.getAllMessages);
router.get("/user/:id_user", authMiddleware, ChatController.getMessagesByUser);
router.post("/", authMiddleware, ChatController.createMessage);
router.put("/:id_chat", authMiddleware, ChatController.updateMessage);
router.delete("/:id_chat", authMiddleware, ChatController.deleteMessage);

module.exports = router;
