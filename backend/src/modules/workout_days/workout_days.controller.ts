import { Request, Response, NextFunction } from "express";
import * as workoutDaysService from "./workout_days.service";

// Lista os dias de um treino
export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const workoutId = Number(req.params.workoutId);

    const workoutDays = await workoutDaysService.findAll(
      workoutId,
      userId
    );

    res.status(200).json(workoutDays);
  } catch (error) {
    next(error);
  }
}

// Busca um dia de treino pelo ID
export async function findById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const id = Number(req.params.id);

    const workoutDay = await workoutDaysService.findById(
      id,
      userId
    );

    res.status(200).json(workoutDay);
  } catch (error) {
    next(error);
  }
}

// Cria um dia dentro de um treino
export async function create(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const workoutId = Number(req.params.workoutId);

    const workoutDay = await workoutDaysService.create(
      workoutId,
      userId,
      req.body
    );

    res.status(201).json(workoutDay);
  } catch (error) {
    next(error);
  }
}

// Atualiza um dia de treino
export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const id = Number(req.params.id);

    const workoutDay = await workoutDaysService.update(
      id,
      userId,
      req.body
    );

    res.status(200).json(workoutDay);
  } catch (error) {
    next(error);
  }
}

// Exclui um dia de treino
export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const id = Number(req.params.id);

    await workoutDaysService.remove(id, userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
