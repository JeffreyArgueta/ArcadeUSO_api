const ChatController = require("../controllers/chat.controller");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, ChatController.getAllMessages);
router.get("/user/:id_user", authMiddleware, ChatController.getMessagesByUser);
router.post("/", authMiddleware, ChatController.createMessage);
router.delete("/:id_chat", authMiddleware, ChatController.deleteMessage);

module.exports = router;
