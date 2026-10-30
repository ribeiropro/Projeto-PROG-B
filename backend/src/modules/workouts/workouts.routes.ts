import { Router } from "express";
import * as workoutsController from "./workouts.controller";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();

// Todas as rotas exigem autenticação JWT
router.use(requireAuth);

/**
 * @openapi
 * /api/workouts:
 *   get:
 *     tags:
 *       - Treinos
 *     summary: Listar treinos do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de treinos do usuário autenticado
 *       401:
 *         description: Token ausente, inválido ou expirado
 */
router.get("/", workoutsController.findAll);

/**
 * @openapi
 * /api/workouts/{id}:
 *   get:
 *     tags:
 *       - Treinos
 *     summary: Buscar treino pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do treino
 *     responses:
 *       200:
 *         description: Treino encontrado
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Treino não encontrado
 */
router.get("/:id", workoutsController.findById);

/**
 * @openapi
 * /api/workouts:
 *   post:
 *     tags:
 *       - Treinos
 *     summary: Criar um novo treino
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Treino de Peito e Tríceps
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Treino criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 */
router.post("/", workoutsController.create);

/**
 * @openapi
 * /api/workouts/{id}:
 *   put:
 *     tags:
 *       - Treinos
 *     summary: Atualizar um treino
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do treino
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Treino de Peito, Ombro e Tríceps
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Treino atualizado com sucesso
 *       400:
 *         description: Dados ou ID inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Treino não encontrado
 */
router.put("/:id", workoutsController.update);

/**
 * @openapi
 * /api/workouts/{id}:
 *   delete:
 *     tags:
 *       - Treinos
 *     summary: Excluir um treino
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do treino
 *     responses:
 *       204:
 *         description: Treino excluído com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Treino não encontrado
 */
router.delete("/:id", workoutsController.remove);

export default router;
