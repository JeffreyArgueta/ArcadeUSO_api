require("dotenv").config();
const jwt = require("jsonwebtoken");
const TokenService = require("../services/token_store.service");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "⚠️ Token de autorización requerido." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const isValid = await TokenService.validateToken(decoded.jti);
    if (!isValid) {
      return res.status(401).json({ error: "⚠️ Token inválido o reutilizado." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "⚠️ Token inválido o expirado." });
  }
};

module.exports = authMiddleware;
