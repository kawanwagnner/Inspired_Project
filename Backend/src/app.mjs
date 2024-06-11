import path from "path";
import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import connectDatabase from "./database/db.mjs";

import feedRoutes from "./routers/feedRoutes.mjs";
import authRoutes from "./routers/authRoutes.mjs";
import userRoutes from "./routers/userRoutes.mjs";
import uploadFiles from "./services/uploadFiles.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Json parser do express - middleware para 'captar' os json do client!
app.use(express.json());

app.use(
  multer({
    storage: uploadFiles.fileStorage,
    fileFilter: uploadFiles.fileFilter,
  }).single("image")
);

app.use("/images", express.static(path.join(__dirname, "images")));

// Middleware para configurar o CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Rotas do app - Esse middleware vai captar todas as rotas criadas no feedRoutes
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Middleware para interceptar os erros
app.use((error, req, res, next) => {
  const message = error.message;
  const status = error.statusCode || 500;
  const data = error.data;

  console.log("Aqui...");
  console.log(message);

  res.status(status).json({ message: message, error: data });
});

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
