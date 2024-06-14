import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('api/workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  
  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.createWorkout(createWorkoutDto);
  }

  @Get(':userId')
  getWorkouts(@Param('userId') userId: number) {
    return this.workoutService.getWorkouts(userId);
  }

  @Get('workout/:id')
  getWorkoutById(@Param('id') id: number) {
    return this.workoutService.getWorkoutById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.updateWorkout(id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.workoutService.deleteWorkout(id);
  }
}
