import { Router } from "express";
import * as workoutsController from "./workouts.controller";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();

// Todas as rotas abaixo exigem autenticação
router.use(requireAuth);

// Listar treinos
router.get("/", workoutsController.findAll);

// Buscar treino pelo ID
router.get("/:id", workoutsController.findById);

// Criar treino
router.post("/", workoutsController.create);

// Atualizar treino
router.put("/:id", workoutsController.update);

// Excluir treino
router.delete("/:id", workoutsController.remove);

export default router;
