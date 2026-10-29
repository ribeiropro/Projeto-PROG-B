import * as workoutsRepository from "./workouts.repository";

import {
  CreateWorkoutDTO,
  UpdateWorkoutDTO
} from "./workouts.entity";

import { AppError } from "../../errors/AppError";

// Lista os treinos do usuário
export async function findAll(userId: number) {
  return await workoutsRepository.findAll(userId);
}

// Busca um treino pelo ID
export async function findById(id: number, userId: number) {
  validateId(id);

  const workout = await workoutsRepository.findById(id, userId);

  if (!workout) {
    throw new AppError(
      "Treino não encontrado.",
      404,
      "WORKOUT_NOT_FOUND"
    );
  }

  return workout;
}

// Cria um novo treino
export async function create(
  userId: number,
  data: CreateWorkoutDTO
) {
  if (
    !data ||
    typeof data.title !== "string" ||
    !data.title.trim() ||
    data.title.trim().length > 200 ||
    (
      data.is_active !== undefined &&
      typeof data.is_active !== "boolean"
    )
  ) {
    throw new AppError(
      "Dados do treino inválidos.",
      400,
      "INVALID_DATA"
    );
  }

  return await workoutsRepository.save(
    userId,
    data.title.trim(),
    data.is_active ?? true
  );
}

// Atualiza um treino
export async function update(
  id: number,
  userId: number,
  data: UpdateWorkoutDTO
) {
  validateId(id);

  const workout = await findById(id, userId);

  if (
    !data ||
    (
      data.title === undefined &&
      data.is_active === undefined
    ) ||
    (
      data.title !== undefined &&
      (
        typeof data.title !== "string" ||
        !data.title.trim() ||
        data.title.trim().length > 200
      )
    ) ||
    (
      data.is_active !== undefined &&
      typeof data.is_active !== "boolean"
    )
  ) {
    throw new AppError(
      "Dados do treino inválidos.",
      400,
      "INVALID_DATA"
    );
  }

  const updated = await workoutsRepository.update(
    id,
    userId,
    data.title !== undefined ? data.title.trim() : workout.title,
    data.is_active ?? workout.is_active
  );

  if (!updated) {
    throw new AppError(
      "Treino não encontrado.",
      404,
      "WORKOUT_NOT_FOUND"
    );
  }

  return updated;
}

// Exclui um treino
export async function remove(id: number, userId: number) {
  validateId(id);

  const deleted = await workoutsRepository.remove(id, userId);

  if (!deleted) {
    throw new AppError(
      "Treino não encontrado.",
      404,
      "WORKOUT_NOT_FOUND"
    );
  }
}

// Valida o ID recebido na rota
function validateId(id: number) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new AppError(
      "ID do treino inválido.",
      400,
      "INVALID_ID"
    );
  }
}
