const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, UserController.getAllUsers);
router.get("/:id_user", authMiddleware, UserController.getUserById);
router.get("/username/:username", UserController.getUserByUsername);
router.get("/email/:email", UserController.getUserByEmail);
router.post("/", UserController.createUser);
router.put("/:id_user", authMiddleware, UserController.updateUser);
router.delete("/:id_user", authMiddleware, UserController.deleteUser);

module.exports = router;
