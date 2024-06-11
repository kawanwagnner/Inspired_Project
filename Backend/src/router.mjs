import { Router } from "express";
import {
  getUsers,
  createUser,
  deleteUser,
} from "./Controllers/userController.mjs";

const routes = Router();

routes.get("/users", getUsers);
routes.post("/users", createUser);
routes.delete("/users/:id", deleteUser);

export default routes;
