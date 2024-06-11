import express from "express";
import connectDatabase from "./database/db.mjs";
import userRouter from "./routers/userRoutes.mjs";
import authRouter from "./routers/authRoutes.mjs";
import feedRouter from "./routers/feedRoutes.mjs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(
  cors({
    origin: "http://localhost:5173", // ou "*" para permitir todas as origens
  })
);

// Json parser do express - middleware para 'captar' os json do client!
app.use(express.json());

app.use("/api", userRouter);
app.use("/auth", authRouter);
app.use("/feed", feedRouter);

connectDatabase()
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida com sucesso.");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB:", err);
  });
