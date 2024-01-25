import { Module } from '@nestjs/common';
import { InterviewerController } from './controllers/interviewer.controller';
import { InterviewerService } from './services/interviewer.service';
import { QuestionsService } from '../questions/questions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewerSchema  } from './entities/interviewer.entity';
// import { InterviewsModule } from 'src/interviews/interviews.module';
import { QuestionSchema } from 'src/questions/entities/question.entity';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Interviewer', schema: InterviewerSchema }]),
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),
    JwtModule,NotificationsModule,UsersModule
  ],
  controllers: [InterviewerController],
  providers: [InterviewerService, QuestionsService,],
})
export class InterviewerModule {}
