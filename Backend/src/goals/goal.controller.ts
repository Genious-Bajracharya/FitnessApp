import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto, UpdateGoalDto } from './dto/goal.dto';

@Controller('api/goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(@Body() dto: CreateGoalDto) {
    return this.goalService.createGoal(dto);
  }

  @Get(':userId')
  getGoals(@Param('userId') userId: number) {
    return this.goalService.getGoals(userId);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateGoalDto) {
    return this.goalService.updateGoal(id, dto);
  }

  @Put('status/:id')
  updateGoalStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.goalService.updateGoalStatus(id, status);
  }

  @Put('weight/:id')
  updateGoalWeight(@Param('id') id: number, @Body('targetWeight') targetWeight: number) {
    return this.goalService.updateGoalWeight(id, targetWeight);
  }
}
