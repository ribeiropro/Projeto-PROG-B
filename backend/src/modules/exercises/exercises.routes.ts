
import { Router } from "express";
import * as exercisesController from "./exercises.controller";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();

// Todas as rotas exigem autenticação JWT
router.use(requireAuth);

/**
 * @openapi
 * /api/exercises:
 *   get:
 *     tags:
 *       - Exercícios
 *     summary: Listar todos os exercícios disponíveis
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de exercícios
 *       401:
 *         description: Token ausente ou inválido
 */
router.get("/", exercisesController.findAll);

/**
 * @openapi
 * /api/exercises/{id}:
 *   get:
 *     tags:
 *       - Exercícios
 *     summary: Buscar exercício pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do exercício
 *     responses:
 *       200:
 *         description: Exercício encontrado
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Exercício não encontrado
 */
router.get("/:id", exercisesController.findById);

/**
 * @openapi
 * /api/exercises:
 *   post:
 *     tags:
 *       - Exercícios
 *     summary: Cadastrar um exercício personalizado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Supino reto
 *               muscle_group:
 *                 type: string
 *                 example: Peito
 *     responses:
 *       201:
 *         description: Exercício criado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       409:
 *         description: Já existe um exercício com esse nome para o mesmo proprietário
 */
router.post("/", exercisesController.create);

/**
 * @openapi
 * /api/exercises/{id}:
 *   put:
 *     tags:
 *       - Exercícios
 *     summary: Atualizar um exercício próprio
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
 *                 example: Supino inclinado
 *               muscle_group:
 *                 type: string
 *                 example: Peito
 *     responses:
 *       200:
 *         description: Exercício atualizado
 *       400:
 *         description: Dados ou ID inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Usuário sem permissão para editar este exercício
 *       404:
 *         description: Exercício não encontrado
 *       409:
 *         description: Já existe um exercício com esse nome para o mesmo proprietário
 */
router.put("/:id", exercisesController.update);

/**
 * @openapi
 * /api/exercises/{id}:
 *   delete:
 *     tags:
 *       - Exercícios
 *     summary: Excluir um exercício próprio
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
 *         description: Exercício excluído
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Usuário sem permissão para excluir este exercício
 *       404:
 *         description: Exercício não encontrado
 *       409:
 *         description: Exercício utilizado em algum treino
 */
router.delete("/:id", exercisesController.remove);

export default router;
