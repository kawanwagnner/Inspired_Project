import express from "express";
import isAuth from "../middleware/token_auth.mjs";
import userController from "../Controllers/userController.mjs";
import { validateEmail, validatePassword } from "../services/validator.mjs";

const router = express.Router();

router.delete("/", isAuth, userController.delete);
router.put("/update", isAuth, userController.update);
router.put(
  "/change-password",
  [validateEmail, validatePassword],
  isAuth,
  userController.changePassword
);
router.get("/profile", isAuth, userController.profile);

export default router;
