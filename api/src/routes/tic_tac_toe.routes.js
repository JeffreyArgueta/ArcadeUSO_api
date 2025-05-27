// routes/tic_tac_toe.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const TicTacToeController = require('../controllers/tic_tac_toe.controller');

// 📦 Ruta para obtener la partida guardada actual del usuario autenticado
router.get('/partida', auth, TicTacToeController.getPartidaGuardada);

// 💾 Guardar o actualizar el estado de la partida en progreso
router.put('/partida', auth, TicTacToeController.guardarPartida);

// 🗑️ Eliminar la partida guardada cuando se termina
router.delete('/partida', auth, TicTacToeController.eliminarPartida);

// 📝 Guardar resultado en historial
router.post('/partida/historial', auth, TicTacToeController.guardarHistorial);

// 📜 Obtener historial por ID de usuario (uso de params)
router.get('/partida/historial/:id_user',TicTacToeController.obtenerHistorialPorUsuario);

router.get('/ranking/top10', auth,TicTacToeController.getTop10Players);

module.exports = router;
