import { check } from "express-validator";
import User from "../models/user.mjs";

const validateEmail = check("email")
  .isEmail()
  .withMessage("Digite um email válido!");

const validatePassword = check("password")
  .isLength({ min: 8 })
  .withMessage("A senha precisa de pelo menos 8 caracteres!");

const validateName = check("name")
  .isLength({ min: 5 })
  .withMessage("O nome precisa de pelo menos 5 caracteres!");

const validateTitle = check("title")
  .isLength({ min: 5 })
  .withMessage("O título precisa de pelo menos 5 caracteres!");

const validateContent = check("content")
  .isLength({ min: 5 })
  .withMessage("O conteúdo precisa de pelo menos 5 caracteres!");

const validateEmailExists = check("email").custom(
  async (emailRecebido, { req }) => {
    try {
      const user = await User.findOne({ email: emailRecebido });
      if (user) {
        return Promise.reject("Email já existe...");
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject("Erro ao verificar email");
    }
  }
);

export {
  validateEmail,
  validatePassword,
  validateName,
  validateTitle,
  validateContent,
  validateEmailExists,
};
