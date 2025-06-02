const { getGoogleAuthURL, getTokens, verifyGoogleToken, generateToken, refreshAccessToken, verifyPassword } = require("../services/auth.service");
const UserService = require("../services/user.service");
const errorHandler = require("../middlewares/errorHandler.middleware");
const validateUsername = require("../middlewares/validateUsername.middleware");
const logger = require("../config/logger");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "⚠️ Email y contraseña son obligatorios." });
    }

    const user = await UserService.getUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ error: "⚠️ Credenciales incorrectas." });
    }

    const token = generateToken(user);
    res.status(200).json({ message: "✅ Login exitoso", token });
  } catch (error) {
    errorHandler(res, error, "Error en autenticación");
  }
};

const generateUniqueUsername = async (name) => {
  let baseName = name.replace(/\s+/g, "").toLowerCase();
  baseName = baseName.substring(0, 10);

  let username = baseName;
  let count = 1;

  while (await UserService.getUserByUsername(username)) {
    username = `${baseName}${count}`;
    count++;
  }

  return username;
};

const loginGoogle = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: "⚠️ Código de autorización requerido." });
    }

    const tokens = await getTokens(code);
    const googleData = await verifyGoogleToken(tokens.id_token);

    if (!googleData || !googleData.email) {
      return res.status(400).json({ error: "⚠️ No se pudo obtener los datos de Google." });
    }

    let user = await UserService.getUserByEmail(googleData.email);

    if (!user) {
      const uniqueUsername = await generateUniqueUsername(googleData.name);

      user = await UserService.createUser({
        username: uniqueUsername,
        email: googleData.email,
        google_id: googleData.google_id,
        authentication_method: "google",
        role: "player",
        uso_coins: 0,
        daro_points: 0,
      });

      logger.info(`ℹ️ Usuario registrado automáticamente con Google: ${googleData.email}`);
    } else {
      logger.info(`🔐 Usuario autenticado con Google: ${googleData.email}`);
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "✅ Login exitoso",
      token,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });

  } catch (error) {
    errorHandler(res, error, "Error en login con Google");
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
    const { username, email, google_id } = req.body;

    if (!username || !email || !google_id) {
      return res.status(400).json({ error: "⚠️ Todos los campos son obligatorios." });
    }

    if (!validateUsername(username)) {
      return res.status(400).json({ error: "⚠️ Username inválido." });
    }

    const isTaken = await UserService.getUserByUsername(username);
    if (isTaken) {
      return res.status(409).json({ error: "⚠️ Username ya en uso." });
    }

    const newUser = await UserService.createUser({
      username,
      email,
      google_id,
      authentication_method: "google",
      role: "player",
      uso_coins: 0,
      daro_points: 0,
    });

    const token = generateToken(newUser);

    res.status(201).json({ message: "✅ Registro exitoso", token });
  } catch (error) {
    errorHandler(res, error, "Error registrando usuario con Google");
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
