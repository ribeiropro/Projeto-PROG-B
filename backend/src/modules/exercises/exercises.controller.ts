
import { Request, Response, NextFunction } from "express";
import * as exercisesService from "./exercises.service";

// Lista todos os exercícios
export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const exercises = await exercisesService.findAll();

    res.status(200).json(exercises);
  } catch (error) {
    next(error);
  }
}

// Busca um exercício pelo ID
export async function findById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const exercise = await exercisesService.findById(id);

    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
}

// Cria um exercício
export async function create(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;

    const exercise = await exercisesService.create(
      userId,
      req.body
    );

    res.status(201).json(exercise);
  } catch (error) {
    next(error);
  }
}

// Atualiza um exercício
export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const id = Number(req.params.id);

    const exercise = await exercisesService.update(
      id,
      userId,
      req.body
    );

    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
}

// Exclui um exercício
export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const id = Number(req.params.id);

    await exercisesService.remove(id, userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
