const express = require("express");
const router = express.Router();
const GachaponAttemptsController = require("../controllers/gachapon_attempts.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, GachaponAttemptsController.getAllAttempts);
router.get("/user/:id_user", authMiddleware, GachaponAttemptsController.getAttemptsByUser);
router.post("/", authMiddleware, GachaponAttemptsController.createAttempt);
router.put("/:id_attempt", authMiddleware, GachaponAttemptsController.updateAttempt);
router.delete("/:id_attempt", authMiddleware, GachaponAttemptsController.deleteAttempt);

module.exports = router;
