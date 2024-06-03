import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

// Rota para criar um post
router.post("/create", (req, res) => {
  const postData = req.body;
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
