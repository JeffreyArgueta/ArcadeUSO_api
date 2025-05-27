const UserController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, UserController.getAllUsers);
router.get("/:id_user", authMiddleware, UserController.getUserById);
router.get("/username/:username", UserController.getUserByUsername);
router.get("/email/:email", UserController.getUserByEmail);
router.put("/:id_user", authMiddleware, UserController.updateUser);
router.delete("/:id_user", authMiddleware, UserController.deleteUser);
router.post("/register", UserController.createUser);

module.exports = router;
