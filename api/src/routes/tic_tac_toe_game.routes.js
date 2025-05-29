const express = require("express");
const router = express.Router();
const TicTacToeGameController = require("../controllers/tic_tac_toe_game.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, TicTacToeGameController.getAllGames);
router.get("/user/:id_user", authMiddleware, TicTacToeGameController.getGamesByUser);
router.post("/", authMiddleware, TicTacToeGameController.createGame);
router.put("/:id_game", authMiddleware, TicTacToeGameController.updateGame);
router.delete("/:id_game", authMiddleware, TicTacToeGameController.deleteGame);
router.get("/leaderboard", authMiddleware, TicTacToeGameController.getLeaderboardGame);

module.exports = router;
