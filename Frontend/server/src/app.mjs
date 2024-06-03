import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { authRouter } from "./Routers/AuthRoutes.mjs";
import { postRouter } from "./Routers/postRoutes.mjs";

const app = express();
const PORT = 3000;

// Middleware para permitir o uso do JSON no corpo da requisição
app.use(bodyParser.json());

// Middleware do cors para permitir solicitações de qualquer origem
app.use(cors());

// Use os routers
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
