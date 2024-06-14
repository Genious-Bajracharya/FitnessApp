

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto/exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async getAllExercises() {
    return this.prisma.exercise.findMany();
  }

  async getExerciseById(id: number) {
    return this.prisma.exercise.findUnique({
      where: { id },
    });
  }

  async createExercise(dto: CreateExerciseDto) {
    console.log(dto);  // DTO data
    return this.prisma.exercise.create({
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async deleteExercise(id: number) {
    return this.prisma.exercise.delete({
      where: { id },
    });
  }
}
