import { Router } from "express";
import * as usersController from "./users.controller";

const router = Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cadastrar um novo usuário
 *     description: Cria um usuário e armazena sua senha protegida por bcrypt.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - weight_kg
 *               - height_cm
 *             properties:
 *               name:
 *                 type: string
 *                 example: Usuario Teste
 *               email:
 *                 type: string
 *                 format: email
 *                 example: teste.orbe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SenhaTeste123!
 *               weight_kg:
 *                 type: number
 *                 example: 70
 *               height_cm:
 *                 type: number
 *                 example: 175
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/register", usersController.register);

export default router;