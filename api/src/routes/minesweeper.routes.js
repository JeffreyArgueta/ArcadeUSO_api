const express = require("express");
const router = express.Router();
const controller = require("../controllers/minesweeper.controller");
const auth = require('../middlewares/auth.middleware');

router.get("/", auth,controller.getAllGames);
router.get("/user/:id_user", auth,controller.getGamesByUser);
router.get("/:id_mine", auth,controller.getGameById);
router.post("/", auth,controller.createGame);
router.delete("/:id_mine", auth,controller.deleteGame);

module.exports = router;
