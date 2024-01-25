import { Module } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { InterviewsController } from './interviews.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { InterviewSchema } from './entities/interview.entity'
import { QuestionsModule } from '../questions/questions.module'
//configuring imagekit service
import { ImageKitService } from '../utils/imagekit.service'


//configuration of config
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'
import { MediaService } from 'media/services/media.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your actual JWT secret key
      signOptions: { expiresIn: '1d' }, // Replace with your desired token expiration time
    }),
    MongooseModule.forFeature([{ name: 'Interview', schema: InterviewSchema }]),
    QuestionsModule
  ],
  controllers: [InterviewsController],
  providers: [InterviewsService, ImageKitService, AuthService, JwtStrategy,MediaService],
  exports: [InterviewsService]
})
export class InterviewsModule { }
