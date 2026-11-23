import * as workoutDaysRepository from "./workout_days.repository";
import * as workoutsRepository from "../workouts/workouts.repository";

import {
  CreateWorkoutDayDTO,
  UpdateWorkoutDayDTO
} from "./workout_days.entity";
import { AppError } from "../../errors/AppError";

const validDays = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo"
];

// Lista os dias de uma ficha
export async function findAll(workoutId: number, userId: number) {
  validateId(workoutId);

  const workout = await workoutsRepository.findById(workoutId, userId);

  if (!workout) {
    throw new AppError(
      "Treino não encontrado.",
      404,
      "WORKOUT_NOT_FOUND"
    );
  }

  return await workoutDaysRepository.findAll(workoutId, userId);
}

// Busca um dia pelo ID
export async function findById(id: number, userId: number) {
  validateId(id);

  const workoutDay = await workoutDaysRepository.findById(id, userId);

  if (!workoutDay) {
    throw new AppError(
      "Dia de treino não encontrado.",
      404,
      "WORKOUT_DAY_NOT_FOUND"
    );
  }

  return workoutDay;
}

// Cria um dia dentro de uma ficha
export async function create(
  workoutId: number,
  userId: number,
  data: CreateWorkoutDayDTO
) {
  validateId(workoutId);
  validateData(data);

  const workoutDay = await workoutDaysRepository.save(
    workoutId,
    userId,
    data.name.trim(),
    data.day_of_week
  );

  if (!workoutDay) {
    throw new AppError(
      "Treino não encontrado.",
      404,
      "WORKOUT_NOT_FOUND"
    );
  }

  return workoutDay;
}

// Atualiza um dia de treino
export async function update(
  id: number,
  userId: number,
  data: UpdateWorkoutDayDTO
) {
  const existingWorkoutDay = await findById(id, userId);

  validateUpdateData(data);

  const updatedWorkoutDay = await workoutDaysRepository.update(
    id,
    userId,
    data.name !== undefined
      ? data.name.trim()
      : existingWorkoutDay.name,
    data.day_of_week !== undefined
      ? data.day_of_week
      : existingWorkoutDay.day_of_week
  );

  if (!updatedWorkoutDay) {
    throw new AppError(
      "Dia de treino não encontrado.",
      404,
      "WORKOUT_DAY_NOT_FOUND"
    );
  }

  return updatedWorkoutDay;
}

// Exclui um dia de treino
export async function remove(id: number, userId: number) {
  await findById(id, userId);

  const deleted = await workoutDaysRepository.remove(id, userId);

  if (!deleted) {
    throw new AppError(
      "Dia de treino não encontrado.",
      404,
      "WORKOUT_DAY_NOT_FOUND"
    );
  }
}

// Valida os dados de criação
function validateData(data: CreateWorkoutDayDTO) {
  if (
    !data ||
    typeof data.name !== "string" ||
    !data.name.trim() ||
    data.name.trim().length > 100 ||
    typeof data.day_of_week !== "string" ||
    !validDays.includes(data.day_of_week)
  ) {
    throw new AppError(
      "Dados do dia de treino inválidos.",
      400,
      "INVALID_DATA"
    );
  }
}

// Valida os dados de atualização
function validateUpdateData(data: UpdateWorkoutDayDTO) {
  if (
    !data ||
    (data.name === undefined && data.day_of_week === undefined) ||
    (
      data.name !== undefined &&
      (
        typeof data.name !== "string" ||
        !data.name.trim() ||
        data.name.trim().length > 100
      )
    ) ||
    (
      data.day_of_week !== undefined &&
      (
        typeof data.day_of_week !== "string" ||
        !validDays.includes(data.day_of_week)
      )
    )
  ) {
    throw new AppError(
      "Dados do dia de treino inválidos.",
      400,
      "INVALID_DATA"
    );
  }
}

// Valida IDs
function validateId(id: number) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new AppError(
      "ID inválido.",
      400,
      "INVALID_ID"
    );
  }
}
