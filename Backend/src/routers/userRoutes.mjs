// routes/index.mjs
import { Router } from "express";
import {
  getUsers,
  deleteUser,
  update,
  getUserProfile, // Adicionando a importação para getUserProfile
} from "../Controllers/userController.mjs"; // Corrigido para o diretório correto
import { authMiddleware } from "../middleware/token_auth.mjs"; // Corrigido para o diretório correto

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.delete("/users/:id", deleteUser);
userRouter.put("/users/update", authMiddleware, update);
userRouter.get("/users/profile", authMiddleware, getUserProfile); // Adicionando a rota para getUserProfile

export default userRouter;
