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
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/create",
  authenticateToken,
  upload.single("post_image"),
  async (req, res) => {
    try {
      const { desc } = req.body;
      const { email, username } = req.user;
      const image = req.file ? req.file.filename : null;

      if (!image) {
        return res.status(400).json({ message: "Imagem é obrigatória." });
      }

      const postData = {
        image,
        description: desc || "",
        email,
        username,
        createdAt: new Date().toISOString(),
      };

      const postsDataFilePath = path.resolve(
        __dirname,
        "..",
        "database",
        "posts.json"
      );

      let postsData = [];
      if (await fileExists(postsDataFilePath)) {
        const data = await fs.readFile(postsDataFilePath, "utf8");
        postsData = JSON.parse(data);
      }

      postsData.push(postData);
      await fs.writeFile(
        postsDataFilePath,
        JSON.stringify(postsData, null, 2),
        "utf8"
      );

      res.json({ message: "Post criado com sucesso!", postData });
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const postsDataFilePath = path.resolve(
      __dirname,
      "..",
      "database",
      "posts.json"
    );
    let postsData = [];

    if (await fileExists(postsDataFilePath)) {
      const data = await fs.readFile(postsDataFilePath, "utf8");
      postsData = JSON.parse(data);
    }

    res.json(postsData);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export { router as postRouter };
