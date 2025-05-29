const reservedUsernames = new Set(["admin", "root", "support"]);

const validateUsername = (username) => {
  if (typeof username !== "string") return { valid: false, error: "⚠️ El nombre de usuario debe ser un texto válido." };

  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!regex.test(username)) return { valid: false, error: "⚠️ Solo letras, números y guion bajo, entre 3 y 20 caracteres." };

  if (reservedUsernames.has(username.toLowerCase())) return { valid: false, error: "⚠️ Nombre de usuario reservado." };

  return { valid: true };
};

module.exports = validateUsername;
