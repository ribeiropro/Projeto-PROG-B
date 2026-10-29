import { Router } from "express";
import * as usersController from "./users.controller";

const router = Router();

// Cadastro de usuários
router.post("/register", usersController.register);

export default router;
