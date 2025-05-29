const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.login);
router.get("/google/login", AuthController.loginGoogle);
router.post("/google/register", AuthController.createUserWithGoogle);
router.post("/refresh-token", AuthController.refreshToken);
router.get("/google/auth-url", AuthController.getAuthURL);

module.exports = router;
