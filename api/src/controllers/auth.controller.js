const UserService = require("../services/user.service");
const { verifyGoogleToken, generateToken, verifyPassword } = require("../services/auth.service");
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
    const { id_token } = req.body;
    if (!id_token) {
      return res.status(400).json({ error: "⚠️ ID Token de Google es obligatorio." });
    }

    const googleData = await verifyGoogleToken(id_token);
    if (!googleData) {
      return res.status(401).json({ error: "⚠️ Token inválido." });
    }

    let user = await UserService.getUserByEmail(googleData.email);

    if (!user) {
      return res.status(202).json({
        message: "⚠️ Usuario no registrado. Debe elegir un username.",
        email: googleData.email,
        google_id: googleData.sub,
      });
    }

    const token = generateToken(user);
    res.status(200).json({ message: "✅ Login exitoso", token });
  } catch (error) {
    errorHandler(res, error, "Error en autenticación con Google");
  }
};


const createUserWithGoogle = async (req, res) => {
  try {
    const { username, email, google_id } = req.body;

    if (!username || !email || !google_id) {
      return res.status(400).json({ error: "⚠️ Todos los campos son obligatorios." });
    }

    if (!validateUsername(username)) {
      return res.status(400).json({ error: "⚠️ Username inválido. Usa solo letras, números o _ entre 3-20 caracteres." });
    }

    let isTaken = await UserService.getUserByUsername(username);
    if (isTaken) {
      return res.status(409).json({ error: "⚠️ Username en uso. Elige otro." });
    }

    const newUser = await UserService.createUser({
      username,
      email,
      google_id,
      authentication_method: "google",
      role: "player",
    });

    const token = generateToken(newUser);
    res.status(201).json({ message: "✅ Registro exitoso", token });
  } catch (error) {
    errorHandler(res, error, "Error registrando usuario");
  }
};

module.exports = { login, loginGoogle, createUserWithGoogle };
