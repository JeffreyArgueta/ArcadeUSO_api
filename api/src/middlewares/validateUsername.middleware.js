const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,20}$/; // Solo letras, números y guiones bajos, entre 3 y 20 caracteres.
  const reservedUsernames = ["admin", "root", "support"]; // Lista de nombres prohibidos.

  if (!regex.test(username) || reservedUsernames.includes(username.toLowerCase())) {
    return false;
  }
  return true;
};

module.exports = validateUsername;
