import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './entities/question.entity'
// auth service
//configuration of config
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'

@Module({
  imports: [ConfigModule.forRoot(),
  JwtModule.register({
    secret: process.env.JWT_SECRET, // Replace with your actual JWT secret key
    signOptions: { expiresIn: '1d' }, // Replace with your desired token expiration time
  }),
  MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),],
  controllers: [QuestionsController],
  providers: [QuestionsService, AuthService, JwtStrategy],
  exports: [QuestionsService],
})
export class QuestionsModule { }
