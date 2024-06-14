import { IsInt, IsString } from "class-validator";

export class CreateGoalDto {
    @IsInt()
    userId: number;

    @IsInt()
    exerciseId: number;

    @IsInt()
    targetWeight: number;
  }
  
  export class UpdateGoalDto {
    @IsInt()
    targetWeight?: number;

    @IsString()
    status?: string;
  }
  