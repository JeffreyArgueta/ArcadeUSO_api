const express = require("express");
const router = express.Router();
const MinesweeperController = require("../controllers/minesweeper.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, MinesweeperController.getAllGames);
router.get("/:id_mine", authMiddleware, MinesweeperController.getGameById);
router.get("/user/:id_user", authMiddleware, MinesweeperController.getGamesByUser);
router.post("/", authMiddleware, MinesweeperController.createGame);
router.put("/:id_mine", authMiddleware, MinesweeperController.updateGame);
router.delete("/:id_mine", authMiddleware, MinesweeperController.deleteGame);

module.exports = router;
