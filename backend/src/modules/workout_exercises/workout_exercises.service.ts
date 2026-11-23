import * as repository from "./workout_exercises.repository";
import * as workoutDaysRepository from "../workout_days/workout_days.repository";
import * as exercisesRepository from "../exercises/exercises.repository";

import {
  CreateWorkoutExerciseDTO,
  UpdateWorkoutExerciseDTO
} from "./workout_exercises.entity";

import { AppError } from "../../errors/AppError";

// Valida um ID
function validateId(id: number): void {
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(
      "O ID informado é inválido.",
      400,
      "INVALID_ID"
    );
  }
}

// Valida os dados do exercício no treino
function validateData(data: CreateWorkoutExerciseDTO): void {
  if (
    !Number.isInteger(data.exercise_id) ||
    data.exercise_id <= 0
  ) {
    throw new AppError(
      "O exercício informado é inválido.",
      400,
      "INVALID_DATA"
    );
  }

  if (
    !Number.isInteger(data.sets) ||
    data.sets <= 0 ||
    !Number.isInteger(data.repetitions) ||
    data.repetitions <= 0
  ) {
    throw new AppError(
      "Séries e repetições devem ser números inteiros positivos.",
      400,
      "INVALID_DATA"
    );
  }

  const restSeconds = data.rest_seconds ?? 90;

  if (!Number.isInteger(restSeconds) || restSeconds < 0) {
    throw new AppError(
      "O tempo de descanso deve ser um número inteiro não negativo.",
      400,
      "INVALID_DATA"
    );
  }

  if (
    data.load_kg !== undefined &&
    data.load_kg !== null &&
    (typeof data.load_kg !== "number" ||
      !Number.isFinite(data.load_kg) ||
      data.load_kg < 0)
  ) {
    throw new AppError(
      "A carga deve ser um número válido e não negativo.",
      400,
      "INVALID_DATA"
    );
  }

  if (
    !Number.isInteger(data.position) ||
    data.position <= 0
  ) {
    throw new AppError(
      "A posição deve ser um número inteiro positivo.",
      400,
      "INVALID_DATA"
    );
  }
}

// Lista os exercícios de um dia de treino
export async function findAll(
  workoutDayId: number,
  userId: number
) {
  validateId(workoutDayId);

  const workoutDay = await workoutDaysRepository.findById(
    workoutDayId,
    userId
  );

  if (!workoutDay) {
    throw new AppError(
      "Dia de treino não encontrado.",
      404,
      "WORKOUT_DAY_NOT_FOUND"
    );
  }

  return repository.findAll(workoutDayId, userId);
}

// Busca um exercício configurado
export async function findById(id: number, userId: number) {
  validateId(id);

  const workoutExercise = await repository.findById(id, userId);

  if (!workoutExercise) {
    throw new AppError(
      "Exercício do treino não encontrado.",
      404,
      "WORKOUT_EXERCISE_NOT_FOUND"
    );
  }

  return workoutExercise;
}

// Adiciona um exercício a um dia de treino
export async function create(
  workoutDayId: number,
  userId: number,
  data: CreateWorkoutExerciseDTO
) {
  validateId(workoutDayId);
  validateData(data);

  const workoutDay = await workoutDaysRepository.findById(
    workoutDayId,
    userId
  );

  if (!workoutDay) {
    throw new AppError(
      "Dia de treino não encontrado.",
      404,
      "WORKOUT_DAY_NOT_FOUND"
    );
  }

  const exercise = await exercisesRepository.findById(
    data.exercise_id
  );

  if (!exercise) {
    throw new AppError(
      "Exercício não encontrado no catálogo.",
      404,
      "EXERCISE_NOT_FOUND"
    );
  }

  const workoutExercise = await repository.save(
    workoutDayId,
    userId,
    data.exercise_id,
    data.sets,
    data.repetitions,
    data.rest_seconds ?? 90,
    data.load_kg ?? null,
    data.position
  );

  if (!workoutExercise) {
    throw new AppError(
      "Não foi possível adicionar o exercício ao treino.",
      404,
      "WORKOUT_DAY_NOT_FOUND"
    );
  }

  return workoutExercise;
}

// Atualiza a configuração de um exercício
export async function update(
  id: number,
  userId: number,
  data: UpdateWorkoutExerciseDTO
) {
  validateId(id);

  const current = await repository.findById(id, userId);

  if (!current) {
    throw new AppError(
      "Exercício do treino não encontrado.",
      404,
      "WORKOUT_EXERCISE_NOT_FOUND"
    );
  }

  const updatedData: CreateWorkoutExerciseDTO = {
    exercise_id: data.exercise_id ?? current.exercise_id,
    sets: data.sets ?? current.sets,
    repetitions: data.repetitions ?? current.repetitions,
    rest_seconds: data.rest_seconds ?? current.rest_seconds,
    load_kg: data.load_kg === undefined
      ? current.load_kg
      : data.load_kg,
    position: data.position ?? current.position
  };

  validateData(updatedData);

  const exercise = await exercisesRepository.findById(
    updatedData.exercise_id
  );

  if (!exercise) {
    throw new AppError(
      "Exercício não encontrado no catálogo.",
      404,
      "EXERCISE_NOT_FOUND"
    );
  }

  const updated = await repository.update(
    id,
    userId,
    updatedData.exercise_id,
    updatedData.sets,
    updatedData.repetitions,
    updatedData.rest_seconds ?? 90,
    updatedData.load_kg ?? null,
    updatedData.position
  );

  if (!updated) {
    throw new AppError(
      "Exercício do treino não encontrado.",
      404,
      "WORKOUT_EXERCISE_NOT_FOUND"
    );
  }

  return updated;
}

// Remove um exercício de um dia de treino
export async function remove(
  id: number,
  userId: number
): Promise<void> {
  validateId(id);

  const removed = await repository.remove(id, userId);

  if (!removed) {
    throw new AppError(
      "Exercício do treino não encontrado.",
      404,
      "WORKOUT_EXERCISE_NOT_FOUND"
    );
  }
}