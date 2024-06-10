import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import { authenticateToken } from "./middleware/authenticateToken.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "..", "uploads");
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Function to check if a file exists
const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

// Rota para criar um novo post
router.post(
  "/create/:username",
  authenticateToken, // Middleware para autenticação do token
  upload.single("post_image"), // Upload de uma única imagem com o nome 'post_image'
  async (req, res) => {
    try {
      const { desc } = req.body; // Descrição do post
      const { username } = req.params; // Nome de usuário vindo da URL
      const image = req.file ? req.file.filename : null; // Nome do arquivo de imagem enviado na requisição

      console.log("Dados do novo post:", { desc, username, image }); // Debug

      if (!image) {
        return res.status(400).json({ message: "Imagem é obrigatória." });
      }

      // Dados do post a serem armazenados
      const postData = {
        image,
        description: desc || "", // Descrição do post (opcional)
        createdAt: new Date().toISOString(), // Data de criação do post
      };

      // Caminho do arquivo que armazena os dados dos usuários
      const usersDataFilePath = path.resolve(
        __dirname,
        "..",
        "database",
        "users.json"
      );

      let usersData = [];
      if (await fileExists(usersDataFilePath)) {
        const data = await fs.readFile(usersDataFilePath, "utf8");
        usersData = JSON.parse(data);
      } else {
        await fs.writeFile(usersDataFilePath, JSON.stringify([]));
      }

      // Encontrar o usuário e adicionar o post à matriz de posts
      const userIndex = usersData.findIndex(
        (user) => user.username === username
      );
      if (userIndex !== -1) {
        if (!usersData[userIndex].posts) {
          usersData[userIndex].posts = [];
        }
        usersData[userIndex].posts.push(postData);
        await fs.writeFile(
          usersDataFilePath,
          JSON.stringify(usersData, null, 2),
          "utf8"
        );
      } else {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      console.log("Post criado com sucesso:", postData); // Debug

      res.json({ message: "Post criado com sucesso!", postData });
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
);

// Rota para obter todos os posts
router.get("/posts", authenticateToken, async (req, res) => {
  try {
    // Caminho do arquivo que armazena os dados dos usuários
    const usersDataFilePath = path.resolve(
      __dirname,
      "..",
      "database",
      "users.json"
    );

    // Lendo os dados dos usuários
    const data = await fs.readFile(usersDataFilePath, "utf8");
    const usersData = JSON.parse(data);

    // Criando um array para armazenar todos os posts
    const allPosts = [];

    // Iterando sobre os usuários para obter seus posts
    usersData.forEach((user) => {
      if (user.posts && user.posts.length > 0) {
        user.posts.forEach((post) => {
          allPosts.push({
            ...post,
            username: user.username,
            user_image: user.user_image || userAvatar, // Adicione a imagem do usuário se disponível
          });
        });
      }
    });

    console.log("Posts encontrados:", allPosts); // Adicione este console.log

    res.json(allPosts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

export { router as postRouter };
