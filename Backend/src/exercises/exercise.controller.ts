
import { Public } from 'src/auth/decorator';
import { Controller, Get, Param,UseGuards,Delete,Body,Post  } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/exercise.dto';

@Controller('api/exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}
  @Public()
  @Get()
  getAllExercises() {
    return this.exerciseService.getAllExercises();
  }
  
  @Public()
  @Get(':id')
  getExerciseById(@Param('id') id: number) {
    return this.exerciseService.getExerciseById(Number(id));
  }

  @Public()
  @Post()
  createExercise(@Body() dto: CreateExerciseDto) {
    return this.exerciseService.createExercise(dto);
  }

  @Public()
  @Delete(':id')
  deleteExercise(@Param('id') id: number) {
    return this.exerciseService.deleteExercise(id);
  }

}
