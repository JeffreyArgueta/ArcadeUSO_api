const express = require("express");
const router = express.Router();
const CatbrossController = require("../controllers/catbross.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, CatbrossController.getAllGames);
router.get("/:id_catbross", authMiddleware, CatbrossController.getGameById);
router.get("/user/:id_user", authMiddleware, CatbrossController.getGamesByUser);
router.post("/", authMiddleware, CatbrossController.createGame);
router.put("/:id_catbross", authMiddleware, CatbrossController.updateGame);
router.delete("/:id_catbross", authMiddleware, CatbrossController.deleteGame);

module.exports = router;
