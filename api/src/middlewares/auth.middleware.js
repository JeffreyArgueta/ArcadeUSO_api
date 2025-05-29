require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "⚠️ Token de autorización requerido en formato válido." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "⚠️ Token expirado, por favor inicia sesión nuevamente." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "⚠️ Token inválido o mal formado." });
    }
    return res.status(500).json({ error: "❌ Error interno en la autenticación." });
  }
};

module.exports = authMiddleware;
