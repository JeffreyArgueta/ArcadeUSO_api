const { getGoogleAuthURL, getTokens, verifyGoogleToken, generateToken, refreshAccessToken, verifyPassword } = require("../services/auth.service");
const UserService = require("../services/user.service");
const errorHandler = require("../middlewares/errorHandler.middleware");
const validateUsername = require("../middlewares/validateUsername.middleware");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "⚠️ Email y contraseña son obligatorios." });
    }

    const user = await UserService.getUserByEmail(email);
    if (!user || !verifyPassword(password, user.password)) {
      return res.status(401).json({ error: "⚠️ Credenciales incorrectas." });
    }

    const token = generateToken(user);
    res.status(200).json({ message: "✅ Login exitoso", token });
  } catch (error) {
    errorHandler(res, error, "Error en autenticación");
  }
};

const loginGoogle = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "⚠️ Código de autorización de Google es obligatorio." });
    }

    const tokens = await getTokens(code);
    const googleData = await verifyGoogleToken(tokens.id_token);
    if (!googleData) {
      return res.status(401).json({ error: "⚠️ Token inválido." });
    }

    let user = await UserService.getUserByEmail(googleData.email);

    if (!user) {
      return res.status(202).json({
        message: "⚠️ Usuario no registrado. Debe elegir un username.",
        email: googleData.email,
        google_id: googleData.google_id,
      });
    }

    const token = generateToken(user);
    res.status(200).json({
      message: "✅ Login exitoso",
      token,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    });
  } catch (error) {
    errorHandler(res, error, "Error en autenticación con Google");
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "⚠️ Refresh token requerido." });
    }

    const accessToken = await refreshAccessToken(refreshToken);
    res.status(200).json({ message: "✅ Token renovado", accessToken });
  } catch (error) {
    errorHandler(res, error, "Error renovando token");
  }
};

const createUserWithGoogle = async (req, res) => {
  try {
    const { username, email, google_id, code } = req.body;

    if (!username || !email || !google_id || !code) {
      return res.status(400).json({ error: "⚠️ Todos los campos son obligatorios." });
    }

    if (!validateUsername(username)) {
      return res.status(400).json({ error: "⚠️ Username inválido. Usa solo letras, números o _ entre 3-20 caracteres." });
    }

    let isTaken = await UserService.getUserByUsername(username);
    if (isTaken) {
      return res.status(409).json({ error: "⚠️ Username en uso. Elige otro." });
    }

    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "⚠️ Código de autorización inválido." });
    }

    let tokens;
    try {
      tokens = await getTokens(code);
    } catch (error) {
      return res.status(401).json({ error: "❌ Error obteniendo tokens de Google. Código inválido o sesión expirada." });
    }

    if (!email || !google_id) {
      return res.status(400).json({ error: "⚠️ No se pudo obtener email o Google ID desde el token. Verifica la configuración de OAuth." });
    }

    const newUser = await UserService.createUser({
      username,
      email,
      google_id,
      authentication_method: "google",
      role: "player",
    });

    const token = generateToken(newUser);

    await TokenStore.create({
      jti: uuidv4(),
      id_user: newUser.id_user,
      refresh_token: tokens.refresh_token
    });

    res.status(201).json({
      message: "✅ Registro exitoso",
      token,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    });
  } catch (error) {
    errorHandler(res, error, "Error registrando usuario");
  }
};

const getAuthURL = async (req, res) => {
  try {
    const authUrl = getGoogleAuthURL();
    res.status(200).json({ url: authUrl });
  } catch (error) {
    errorHandler(res, error, "Error generando URL de autenticación con Google");
  }
};

module.exports = { login, loginGoogle, refreshToken, createUserWithGoogle, getAuthURL };
