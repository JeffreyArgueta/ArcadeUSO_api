require("dotenv").config();
const { google } = require("googleapis");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserService = require("./user.service");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

// 🔐 Genera la URL de login de Google
const getGoogleAuthURL = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile"
    ],
    redirect_uri: REDIRECT_URI
  });
};

// 🔑 Intercambia el "code" por tokens
const getTokens = async (code) => {
  const { tokens } = await oauth2Client.getToken({
    code,
    redirect_uri: REDIRECT_URI // ✅ necesario también aquí
  });
  return tokens;
};


// ✅ Extrae los datos del usuario desde el ID token de Google
const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const { email, sub: google_id, name } = ticket.getPayload();
    return { email, google_id, name };
  } catch (error) {
    console.error("❌ Error verificando ID Token:", error.message);
    throw new Error("⚠️ Token inválido o error en autenticación con Google.");
  }
};

// 🔒 Genera JWT personalizado para tu sistema
const generateToken = (user) => {
  return jwt.sign(
    {
      id_user: user.id_user,
      email: user.email,
      role: user.role,
      jti: uuidv4()
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// 🔁 Renueva el access_token usando refresh_token
const refreshAccessToken = async (refreshToken) => {
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const { credentials } = await oauth2Client.refreshAccessToken();
  return credentials.access_token;
};

// 🔐 Verifica la contraseña para login manual
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  getGoogleAuthURL,
  getTokens,
  verifyGoogleToken,
  generateToken,
  refreshAccessToken,
  verifyPassword
};
