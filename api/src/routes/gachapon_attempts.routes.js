const GachaponController = require("../controllers/gachapon_attempts.controller");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, GachaponController.getAllAttempts);
router.get("/user/:id_user", authMiddleware, GachaponController.getAttemptsByUser);
router.post("/", authMiddleware, GachaponController.createAttempt);
router.put("/:id_attempt", authMiddleware, GachaponController.updateAttempt);
router.delete("/:id_attempt", authMiddleware, GachaponController.deleteAttempt);

module.exports = router;
