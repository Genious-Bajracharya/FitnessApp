import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalDto, UpdateGoalDto } from './dto/goal.dto';

@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}

  async createGoal(dto: CreateGoalDto) {
    return this.prisma.goal.create({
      data: {
        userId: dto.userId,
        exerciseId: dto.exerciseId,
        targetWeight: dto.targetWeight,
      },
    });
  }

  async getGoals(userId: number) {
    return this.prisma.goal.findMany({
      where: {  userId: Number(userId)},
      include: { exercise: true },
    });
  }

  async updateGoal(id: number, dto: UpdateGoalDto) {
    return this.prisma.goal.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteGoal(id: number) {
    return this.prisma.goal.delete({
      where: { id },
    });
  }

  async updateGoalStatus(id: number, status: string) {
    return this.prisma.goal.update({
      where: { id: Number(id) },
      data: { status },
    });
  }

  async updateGoalWeight(id: number, targetWeight: number) {
    return this.prisma.goal.update({
      where: { id: Number(id) },
      data: { targetWeight },
    });
  }
}
