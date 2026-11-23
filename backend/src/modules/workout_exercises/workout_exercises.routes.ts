
import { Router } from "express";
import * as controller from "./workout_exercises.controller";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();

router.use(requireAuth);

/**
 * @openapi
 * /api/workout-days/{workoutDayId}/exercises:
 *   get:     
 *     tags: 
 *       - Configurações de Exercícios
 *     summary: Lista os exercícios de um dia de treino
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutDayId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de exercícios retornada
 */
router.get(
  "/workout-days/:workoutDayId/exercises",
  controller.findAll
);

/**
 * @openapi
 * /api/workout-days/{workoutDayId}/exercises:
 *   post:
 *     tags: 
 *       - Configurações de Exercícios
 *     summary: Adiciona um exercício a um dia de treino
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutDayId
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
 *               - exercise_id
 *               - sets
 *               - repetitions
 *               - position
 *             properties:
 *               exercise_id:
 *                 type: integer
 *               sets:
 *                 type: integer
 *               repetitions:
 *                 type: integer
 *               rest_seconds:
 *                 type: integer
 *                 default: 90
 *               load_kg:
 *                 type: number
 *                 nullable: true
 *               position:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Exercício adicionado
 */
router.post(
  "/workout-days/:workoutDayId/exercises",
  controller.create
);

/**
 * @openapi
 * /api/workout-exercises/{id}:
 *   get:
 *     tags: 
 *       - Configurações de Exercícios
 *     summary: Busca uma configuração de exercício
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
 *         description: Configuração encontrada
 */
router.get(
  "/workout-exercises/:id",
  controller.findById
);

/**
 * @openapi
 * /api/workout-exercises/{id}:
 *   put:
 *     tags: 
 *       - Configurações de Exercícios
 *     summary: Atualiza a configuração de um exercício
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
 *               exercise_id:
 *                 type: integer
 *               sets:
 *                 type: integer
 *               repetitions:
 *                 type: integer
 *               rest_seconds:
 *                 type: integer
 *               load_kg:
 *                 type: number
 *                 nullable: true
 *               position:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Configuração atualizada
 */
router.put(
  "/workout-exercises/:id",
  controller.update
);

/**
 * @openapi
 * /api/workout-exercises/{id}:
 *   delete:
 *     tags: 
 *       - Configurações de Exercícios
 *     summary: Remove um exercício de um dia de treino
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
 *         description: Exercício removido
 */
router.delete(
  "/workout-exercises/:id",
  controller.remove
);

export default router;
