require("dotenv").config(); // Carga variables de entorno
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./src/routes/auth.routes");
const gachaponAttemptsRoutes = require("./src/routes/gachapon_attempts.routes");
const minesweeperRoutes = require("./src/routes/minesweeper.routes");
const rewardRoutes = require("./src/routes/reward.routes");
const ticTacToeGameRoutes = require("./src/routes/tic_tac_toe_game.routes");
const ticTacToeSaveRoutes = require("./src/routes/tic_tac_toe_save.routes");
const userRoutes = require("./src/routes/user.routes");

const app = express();

const FRONTEND = process.env.FRONTEND;
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: FRONTEND,
  credentials: true
}));
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/gachapon_attempts", gachaponAttemptsRoutes);
app.use("/minesweeper", minesweeperRoutes);
app.use("/reward", rewardRoutes);
app.use("/tic_tac_toe/game", ticTacToeGameRoutes);
app.use("/tic_tac_toe/save", ticTacToeSaveRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando correctamente!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
