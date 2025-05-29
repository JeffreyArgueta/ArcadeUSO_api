const express = require("express");
const router = express.Router();
const TicTacToeSaveController = require("../controllers/tic_tac_toe_save.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, TicTacToeSaveController.getAllSaves);
router.get("/user/:id_user", authMiddleware, TicTacToeSaveController.getSavesByUser);
router.post("/", authMiddleware, TicTacToeSaveController.createSave);
router.put("/:id_save", authMiddleware, TicTacToeSaveController.updateSave);
router.delete("/:id_save", authMiddleware, TicTacToeSaveController.deleteSave);

module.exports = router;
