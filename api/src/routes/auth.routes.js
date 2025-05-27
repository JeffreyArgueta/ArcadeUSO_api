const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/google/auth-url", authController.getAuthURL);
router.post("/login/google", authController.loginGoogle);
router.post("/register/google", authController.createUserWithGoogle);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
