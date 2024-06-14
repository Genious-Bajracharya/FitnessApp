import { IsNotEmpty, IsInt, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class CreateWorkoutExerciseDto {
  @IsInt()
  exerciseId: number;

  @IsInt()
  sets: number;

  @IsInt()
  reps: number;

  @IsInt()
  weight: number;
}

export class CreateWorkoutDto {
  @IsInt()
  userId: number;

  @IsDateString()
  workoutDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutExerciseDto)
  exercises: CreateWorkoutExerciseDto[];
}
