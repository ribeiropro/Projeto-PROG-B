export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public weight_kg: number,
    public height_cm: number,
    public profile_image: Buffer | null,
    public created_at: Date
  ) {}
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  weight_kg: number;
  height_cm: number;
}
