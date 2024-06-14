import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guard';
import { AuthModule } from './auth/auth.module';
import { WorkoutModule } from './workout/workout.model';
import { ExerciseModule } from './exercises/exercise.module';
import { GoalModule } from './goals/goals.module';


@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),WorkoutModule,
    ExerciseModule,
    GoalModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule { }
