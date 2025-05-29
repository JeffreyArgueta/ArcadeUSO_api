require("dotenv").config();
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

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

const getTokens = async (code) => {
  const { tokens } = await oauth2Client.getToken({ code, redirect_uri: REDIRECT_URI });
  return tokens;
};

const verifyGoogleToken = async (idToken) => {
  try {
    if (!idToken) throw new Error("⚠️ ID Token no proporcionado.");

    const ticket = await oauth2Client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID, });
    if (!ticket) throw new Error("⚠️ Token inválido.");

    const { email, sub: google_id, name } = ticket.getPayload();
    return { email, google_id, name };
  } catch (error) {
    console.error("❌ Error verificando ID Token:", error.message);
    throw new Error("⚠️ Token inválido o error en autenticación con Google.");
  }
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id_user: user.id_user,
      username: user.username,
      email: user.email,
      authentication_method: user.authentication_method,
      role: user.role,
      uso_coins: user.uso_coins,
      daro_points: user.daro_points,
      created_at: user.created_at,
      updated_at: user.updated_at
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const refreshAccessToken = async (refreshToken) => {
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const newToken = await oauth2Client.getAccessToken();
  return newToken.token;
};

const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { getGoogleAuthURL, getTokens, verifyGoogleToken, generateToken, refreshAccessToken, verifyPassword };
