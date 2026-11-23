export class WorkoutDay {
  constructor(
    public id: number,
    public workout_id: number,
    public name: string,
    public day_of_week: string
  ) {}
}

export interface CreateWorkoutDayDTO {
  name: string;
  day_of_week: string;
}

export interface UpdateWorkoutDayDTO {
  name?: string;
  day_of_week?: string;
}
