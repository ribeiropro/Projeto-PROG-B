export class Exercise {
  constructor(
    public id: number,
    public name: string,
    public muscle_group: string,
    public user_id: number | null
  ) {}
}

export interface CreateExerciseDTO {
  name: string;
  muscle_group: string;
}

export interface UpdateExerciseDTO {
  name?: string;
  muscle_group?: string;
}
