import { isNotEmpty, IsString } from "class-validator";

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsString()
  description: string

  }