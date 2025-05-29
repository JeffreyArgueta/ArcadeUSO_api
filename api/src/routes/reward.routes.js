const express = require("express");
const router = express.Router();
const RewardController = require("../controllers/reward.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, RewardController.getAllRewards);
router.get("/:id_reward", authMiddleware, RewardController.getRewardById);
router.get("/rarity/:rarity", authMiddleware, RewardController.getRewardsByRarity);
router.post("/", authMiddleware, RewardController.createReward);
router.put("/:id_reward", authMiddleware, RewardController.updateReward);
router.delete("/:id_reward", authMiddleware, RewardController.deleteReward);

module.exports = router;
