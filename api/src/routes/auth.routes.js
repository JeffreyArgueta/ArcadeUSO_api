const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register/google", authController.createUserWithGoogle);
router.post("/login/google", authController.loginGoogle);
router.post("/login", authController.login);

module.exports = router;
