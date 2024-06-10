import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { authRouter } from "./Routers/AuthRoutes.mjs";
import { postRouter } from "./Routers/postRoutes.mjs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware para permitir o uso do JSON no corpo da requisição com limite de 50MB
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Middleware do cors para permitir solicitações de qualquer origem
app.use(cors());

// Servir arquivos estáticos da pasta uploads
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Use os routers
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
