import express from "express";
import { signUpUser, signInUser } from "../Controllers/authController.mjs";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateEmailExists,
} from "../services/validator.mjs";

const router = express.Router();

router.post(
  "/signup",
  [validateEmail, validateName, validatePassword, validateEmailExists],
  signUpUser
);

router.post("/signin", [validateEmail, validatePassword], signInUser);

export default router;
