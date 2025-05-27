require("dotenv").config(); // Carga variables de entorno
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./src/routes/auth.routes");
const catbrossRoutes = require("./src/routes/catbross.routes");
const chatRoutes = require("./src/routes/chat.routes");
const gachaponAttemptsRoutes = require("./src/routes/gachapon_attempts.routes");
const rewardRoutes = require("./src/routes/reward.routes");
const userRoutes = require("./src/routes/user.routes");
const ticTacToeRoutes = require('./src/routes/tic_tac_toe.routes');
const minesweeper = require('./src/routes/minesweeper.routes');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/catbross", catbrossRoutes);
app.use("/chat", chatRoutes);
app.use("/gachapon_attempts", gachaponAttemptsRoutes);
app.use("/reward", rewardRoutes);
app.use("/user", userRoutes);
app.use('/tictactoe', ticTacToeRoutes);
app.use('/minesweeper', minesweeper);

app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando correctamente!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
