import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

// Rota para criar um post
router.post("/create", (req, res) => {
  const { image, description, email } = req.body;

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!image || !email) {
    return res.status(400).json({
      message: "Imagem e email são obrigatórios.",
    });
  }

  const postData = {
    image,
    description: description || "",
    email,
    createdAt: new Date().toISOString(), // Adiciona um timestamp ao post
  };

  const postsDataFilePath = path.resolve(
    __dirname,
    "..",
    "database",
    "posts.json"
  );

  // Verifica se o arquivo de posts já existe, caso contrário, cria um array vazio
  let postsData = [];
  if (fs.existsSync(postsDataFilePath)) {
    postsData = JSON.parse(fs.readFileSync(postsDataFilePath, "utf8"));
  }

  // Adiciona o novo post
  postsData.push(postData);

  // Escreve os dados atualizados de volta ao arquivo
  fs.writeFileSync(
    postsDataFilePath,
    JSON.stringify(postsData, null, 2),
    "utf8"
  );

  res.json({ message: "Post criado com sucesso!", postData });
});

export { router as postRouter };
