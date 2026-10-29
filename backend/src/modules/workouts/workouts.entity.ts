export class Workout {
  constructor(
    public id: number,
    public user_id: number,
    public title: string,
    public is_active: boolean,
    public created_at: Date
  ) {}
}

export interface CreateWorkoutDTO {
  title: string;
  is_active?: boolean;
}

export interface UpdateWorkoutDTO {
  title?: string;
  is_active?: boolean;
}
