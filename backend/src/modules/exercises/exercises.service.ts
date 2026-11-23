import * as exercisesRepository from "./exercises.repository";

import {
  CreateExerciseDTO,
  UpdateExerciseDTO
} from "./exercises.entity";

import { AppError } from "../../errors/AppError";

// Lista todos os exercícios disponíveis
export async function findAll() {
  return await exercisesRepository.findAll();
}

// Busca um exercício pelo ID
export async function findById(id: number) {
  validateId(id);

  const exercise = await exercisesRepository.findById(id);

  if (!exercise) {
    throw new AppError(
      "Exercício não encontrado.",
      404,
      "EXERCISE_NOT_FOUND"
    );
  }

  return exercise;
}

// Cria um novo exercício personalizado
export async function create(
  userId: number,
  data: CreateExerciseDTO
) {
  if (
    !data ||
    typeof data.name !== "string" ||
    !data.name.trim() ||
    data.name.trim().length > 100 ||
    typeof data.muscle_group !== "string" ||
    !data.muscle_group.trim() ||
    data.muscle_group.trim().length > 100
  ) {
    throw new AppError(
      "Dados do exercício inválidos.",
      400,
      "INVALID_DATA"
    );
  }


    return await exercisesRepository.save(
    userId,
    data.name.trim(),
    data.muscle_group.trim()
  );
}

// Atualiza um exercício próprio
export async function update(
  id: number,
  userId: number,
  data: UpdateExerciseDTO
) {
  validateId(id);

  const exercise = await findById(id);

  // Verifica se o exercício pertence ao usuário
  if (exercise.user_id !== userId) {
    throw new AppError(
      "Você não tem permissão para editar este exercício.",
      403,
      "EXERCISE_FORBIDDEN"
    );
  }

  if (
    !data ||
    (
      data.name === undefined &&
      data.muscle_group === undefined
    ) ||
    (
      data.name !== undefined &&
      (
        typeof data.name !== "string" ||
        !data.name.trim() ||
        data.name.trim().length > 100
      )
    ) ||
    (
      data.muscle_group !== undefined &&
      (
        typeof data.muscle_group !== "string" ||
        !data.muscle_group.trim() ||
        data.muscle_group.trim().length > 100
      )
    )
  ) {
    throw new AppError(
      "Dados do exercício inválidos.",
      400,
      "INVALID_DATA"
    );
  }

  const updated = await exercisesRepository.update(
    id,
    userId,
    data.name !== undefined
      ? data.name.trim()
      : exercise.name,
    data.muscle_group !== undefined
      ? data.muscle_group.trim()
      : exercise.muscle_group
  );

  if (!updated) {
    throw new AppError(
      "Exercício não encontrado.",
      404,
      "EXERCISE_NOT_FOUND"
    );
  }

  return updated;
}

// Exclui um exercício próprio
export async function remove(
  id: number,
  userId: number
) {
  validateId(id);

  const exercise = await findById(id);

  // Impede excluir exercícios de outros usuários ou padrão
  if (exercise.user_id !== userId) {
    throw new AppError(
      "Você não tem permissão para excluir este exercício.",
      403,
      "EXERCISE_FORBIDDEN"
    );
  }

  // Impede excluir exercícios utilizados em treinos
  const used = await exercisesRepository.isUsed(id);

  if (used) {
    throw new AppError(
      "Este exercício está sendo utilizado em um ou mais treinos e não pode ser excluído.",
      409,
      "EXERCISE_IN_USE"
    );
  }

  const deleted = await exercisesRepository.remove(id, userId);

  if (!deleted) {
    throw new AppError(
      "Não foi possível excluir o exercício.",
      404,
      "EXERCISE_NOT_FOUND"
    );
  }
}

// Valida o ID recebido na rota
function validateId(id: number) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new AppError(
      "ID do exercício inválido.",
      400,
      "INVALID_ID"
    );
  }
}
