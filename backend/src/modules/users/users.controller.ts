import { Request, Response, NextFunction } from "express";
import * as usersService from "./users.service";

// Recebe a requisição de cadastro
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await usersService.register(req.body);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user,
    });
  } catch (error) {
    next(error);
  }
}
