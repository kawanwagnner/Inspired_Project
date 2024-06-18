import { Router } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/feedController.mjs";
import { authMiddleware } from "../middleware/token_auth.mjs";
import upload from "../services/uploadFiles.mjs"; // Certifique-se de que o caminho está correto

const feedRouter = Router();

// Rota para obter todas as postagens no feed
feedRouter.get("/posts", authMiddleware, getPosts);

// Rota para criar uma nova postagem no feed
feedRouter.post("/post", authMiddleware, upload.single("image"), createPost);

// Rota para atualizar uma postagem no feed
feedRouter.put(
  "/posts/:postId",
  authMiddleware,
  upload.single("image"),
  updatePost
);

// Rota para deletar uma postagem do feed
feedRouter.delete("/posts/:postId", authMiddleware, deletePost);

export default feedRouter;
