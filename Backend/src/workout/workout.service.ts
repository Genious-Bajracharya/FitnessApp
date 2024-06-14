import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}

  async createWorkout(dto: CreateWorkoutDto) {
    const { userId, workoutDate, exercises } = dto;

    const workout = await this.prisma.workout.create({
      data: {
        userId,
        workoutDate: new Date(workoutDate),
        exercises: {
          create: exercises.map((ex) => ({
            exerciseId: ex.exerciseId,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
          })),
        },
      },
      include: {
        exercises: true,
      },
    });

    return workout;
  }

  async getWorkouts(userId: number) {
    return this.prisma.workout.findMany({
      where: { userId: Number(userId) },
      include: { 
        exercises: {
          include: {
            exercise: true, 
        },
      }, 
    },
    });
  }

  async getWorkoutById(id: number) {
    
    return this.prisma.workout.findUnique({
      where: { id },
      include: { exercises: true },
    });
  }

  async updateWorkout(id: number, dto: UpdateWorkoutDto) {
    const { exercises, ...workoutData } = dto;

    await this.prisma.workoutExercise.deleteMany({
      where: { workoutId: id },
    });

    return this.prisma.workout.update({
      where: { id },
      data: {
        ...workoutData,
        exercises: {
          create: exercises,
        },
      },
      include: { exercises: true },
    });
  }

  async deleteWorkout(id: number) {
    return this.prisma.workout.delete({
      where: { id },
    });
  }
}
