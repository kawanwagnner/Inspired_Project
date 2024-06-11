import express from "express";
import feedController from "../Controllers/feedController.mjs";
// import { check, body } from "express-validator";
import { validateTitle, validateContent } from "../services/validator.mjs";
import isAuth from "../middleware/token_auth.mjs";

const router = express.Router();

// Criar as rotas relacionadas ao feed
router.get("/posts", feedController.getPosts);

// Validar as informações
router.post(
  "/post",
  [validateTitle, validateContent],
  isAuth,
  feedController.createPost
);

router.patch("/post/:postID", feedController.updatePost);
router.delete("/post/:postID", feedController.deletePost);
router.delete("/post/", feedController.deletePost);

export default router;
