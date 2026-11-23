import { Router } from "express";
import * as workoutDaysController from "./workout_days.controller";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();

// Todas as rotas exigem autenticação JWT
router.use(requireAuth);

/**
 * @openapi
 * /api/workouts/{workoutId}/days:
 *   get:
 *     tags:
 *       - Dias do Treino
 *     summary: Listar dias de um treino
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do treino
 *     responses:
 *       200:
 *         description: Lista de dias do treino
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Treino não encontrado
 */
router.get(
  "/workouts/:workoutId/days",
  workoutDaysController.findAll
);

/**
 * @openapi
 * /api/workouts/{workoutId}/days:
 *   post:
 *     tags:
 *       - Dias do Treino
 *     summary: Criar dia em um treino
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - day_of_week
 *             properties:
 *               name:
 *                 type: string
 *                 example: Treino A
 *               day_of_week:
 *                 type: string
 *                 enum: [segunda, terca, quarta, quinta, sexta, sabado, domingo]
 *                 example: segunda
 *     responses:
 *       201:
 *         description: Dia criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Treino não encontrado
 */
router.post(
  "/workouts/:workoutId/days",
  workoutDaysController.create
);

/**
 * @openapi
 * /api/workout-days/{id}:
 *   get:
 *     tags:
 *       - Dias do Treino
 *     summary: Buscar dia pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dia encontrado
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Dia não encontrado
 */
router.get("/workout-days/:id", workoutDaysController.findById);

/**
 * @openapi
 * /api/workout-days/{id}:
 *   put:
 *     tags:
 *       - Dias do Treino
 *     summary: Atualizar dia de treino
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Treino B
 *               day_of_week:
 *                 type: string
 *                 enum: [segunda, terca, quarta, quinta, sexta, sabado, domingo]
 *                 example: quarta
 *     responses:
 *       200:
 *         description: Dia atualizado com sucesso
 *       400:
 *         description: Dados ou ID inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Dia não encontrado
 */
router.put("/workout-days/:id", workoutDaysController.update);

/**
 * @openapi
 * /api/workout-days/{id}:
 *   delete:
 *     tags:
 *       - Dias do Treino
 *     summary: Excluir dia de treino
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Dia excluído com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Dia não encontrado
 */
router.delete("/workout-days/:id", workoutDaysController.remove);

export default router;
