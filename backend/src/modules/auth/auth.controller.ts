import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

// Recebe a requisição de login
export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      message: "Login realizado com sucesso!",
      ...result,
    });
  } catch (error) {
    next(error);
  }
}
