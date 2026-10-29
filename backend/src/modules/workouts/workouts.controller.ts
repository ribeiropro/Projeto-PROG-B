import { Request, Response, NextFunction } from "express";
import * as workoutsService from "./workouts.service";

// Lista os treinos do usuário autenticado
export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;

    const workouts = await workoutsService.findAll(userId);

    res.status(200).json(workouts);
  } catch (error) {
    next(error);
  }
}

// Busca um treino pelo ID
export async function findById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const id = Number(req.params.id);

    const workout = await workoutsService.findById(id, userId);

    res.status(200).json(workout);
  } catch (error) {
    next(error);
  }
}

// Cria um treino
export async function create(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;

    const workout = await workoutsService.create(
      userId,
      req.body
    );

    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
}

// Atualiza um treino
export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const id = Number(req.params.id);

    const workout = await workoutsService.update(
      id,
      userId,
      req.body
    );

    res.status(200).json(workout);
  } catch (error) {
    next(error);
  }
}

// Exclui um treino
export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const id = Number(req.params.id);

    await workoutsService.remove(id, userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
