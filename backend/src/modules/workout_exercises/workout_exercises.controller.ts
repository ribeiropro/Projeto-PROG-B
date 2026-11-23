import { Request, Response, NextFunction } from "express";
import * as service from "./workout_exercises.service";

// Lista os exercícios de um dia de treino
export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workoutDayId = Number(req.params.workoutDayId);
    const userId = res.locals.userId;

    const exercises = await service.findAll(
      workoutDayId,
      userId
    );

    res.json(exercises);
  } catch (error) {
    next(error);
  }
}

// Busca um exercício configurado pelo ID
export async function findById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.userId;

    const exercise = await service.findById(id, userId);

    res.json(exercise);
  } catch (error) {
    next(error);
  }
}

// Adiciona um exercício a um dia de treino
export async function create(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workoutDayId = Number(req.params.workoutDayId);
    const userId = res.locals.userId;

    const exercise = await service.create(
      workoutDayId,
      userId,
      req.body
    );

    res.status(201).json(exercise);
  } catch (error) {
    next(error);
  }
}

// Atualiza um exercício configurado
export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.userId;

    const exercise = await service.update(
      id,
      userId,
      req.body
    );

    res.json(exercise);
  } catch (error) {
    next(error);
  }
}

// Remove um exercício de um dia de treino
export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.userId;

    await service.remove(id, userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}