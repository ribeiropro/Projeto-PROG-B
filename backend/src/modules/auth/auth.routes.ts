import { Router } from "express";
import * as authController from "./auth.controller";

const router = Router();

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Realizar login
 *     description: Verifica as credenciais do usuário e retorna um token JWT válido por 1 hora.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: swagger.orbe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SenhaTeste123!
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retornando token JWT e dados do usuário
 *       400:
 *         description: E-mail ou senha não informados
 *       401:
 *         description: Credenciais incorretas
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", authController.login);

export default router;
