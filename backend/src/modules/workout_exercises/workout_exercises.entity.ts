export class WorkoutExercise {
  constructor(
    public id: number,
    public workout_day_id: number,
    public exercise_id: number,
    public sets: number,
    public repetitions: number,
    public rest_seconds: number,
    public load_kg: number | null,
    public position: number
  ) {}
}

export interface CreateWorkoutExerciseDTO {
  exercise_id: number;
  sets: number;
  repetitions: number;
  rest_seconds?: number;
  load_kg?: number | null;
  position: number;
}

export interface UpdateWorkoutExerciseDTO {
  exercise_id?: number;
  sets?: number;
  repetitions?: number;
  rest_seconds?: number;
  load_kg?: number | null;
  position?: number;
}
