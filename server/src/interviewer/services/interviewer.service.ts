import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterviewerDto } from '../dtos/create-interviewer.dto';
import { UpdateInterviewerDto } from '../dtos/update-interviewer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Interviewer } from '../entities/interviewer.entity';
import { Model } from 'mongoose';
import { QuestionsService } from '../../questions/questions.service';
import { NotificationGateway } from 'src/notifications/gateways/notification.gateway';
import { UsersService } from 'src/users/users.service';
import * as crypto from 'crypto';


@Injectable()
export class InterviewerService {
  constructor(
    @InjectModel('Interviewer') private interviewerModel: Model<Interviewer>,
    private questionsService: QuestionsService,
    private notificationGateway: NotificationGateway,
    private userService: UsersService,
  ) {}

  // async create(createInterviewerDto: CreateInterviewerDto) {
  //   // Check if the question exists
  //   const question = await this.questionsService.findOne(
  //     createInterviewerDto.question_id,
  //   );
  //   if (!question) {
  //     throw new NotFoundException('Question not found');
  //   }

  //   // Check if the interview exists
  //   const interview = await this.findQuestionAndJob(
  //     createInterviewerDto.interviewee,
  //     question?.job_id?._id,
  //   );

  //   let createdInterviewer;

  //   if (interview) {
  //     // Update the existing interviewer with the new question
  //     createdInterviewer = await this.interviewerModel.findByIdAndUpdate(
  //       interview._id,
  //       {
  //         $push: {
  //           questions: {
  //             question_id: createInterviewerDto.question_id,
  //           },
  //         },
  //       },
  //       {
  //         new: true,
  //       },
  //     );
  //   } else {
  //     createdInterviewer = await this.interviewerModel.create({
  //       // interviewee: createInterviewerDto.interviewee,
  //       interviewer: createInterviewerDto.interviewer,
  //       job_title: createInterviewerDto.job_title,
  //       questions: [
  //         {
  //           question_id: createInterviewerDto.question_id,
  //         },
  //       ],
  //     });
  //   }

  //   // Notify the interviewee
  //   const intervieweeId = createdInterviewer.interviewee;
  //   const notificationMessage =
  //     'You have been invited for an interview for job';

  //   this.notificationGateway.handleNotification(
  //     `${intervieweeId}: ${notificationMessage}`,
  //   );

  //   return createdInterviewer;
  // }


  async create(createInterviewerDto: CreateInterviewerDto) {
    try {
      const interviewer = await this.userService.findById(
        createInterviewerDto.interviewer,
      );

      if (!interviewer) {
        throw new NotFoundException('Interviewer not found');
      }

      function generateUniqueLink(): string {
        const uniqueId = crypto.randomBytes(8).toString('hex');
        return `https://staging.videointerviews.io/${uniqueId}`;
        // return `http://localhost:3000/video-interviews/${uniqueId}`;

      }
    

      const uniqueLink = generateUniqueLink();
      
      const interviewerWithLink = {
        ...createInterviewerDto,
        share_link: uniqueLink,
      };
  

      const createdInterviewer = await this.interviewerModel.create(
        interviewerWithLink,
      );
      return createdInterviewer;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Error creating interviewer');
    }
  }

  async findAll() {
    let interviews = await this.interviewerModel
      .find()
      // .populate({
      //   path: 'interviewee',
      //   select: '-password',
      // })
      .populate({
        path: 'job_title',
      })
      .populate({
        path: 'job_recruiter'
      })
      .populate('questions')
      .populate('interviewer', '-password');

    if (interviews.length == 0) {
      throw new NotFoundException('interviewer not found');
    }
    return interviews;
  }

  async findQuestionAndJob(interviewee: string, job_title: string) {
    let interview = await this.interviewerModel
      .findOne({
        job_title,
      })
      .populate({
        path: 'interviewee',
        select: '-password',
      })
      .populate({
        path: 'job_id',
      })
      .populate({
        path: 'job_recruiter'
      })
      .populate('questions');

    return interview;
  }

  async findOne(id: string) {
    let interviewer = await this.interviewerModel
      .findById(id)
      // .populate({
      //   path: 'interviewee',
      //   select: '-password',
      // })
      .populate({
        path: 'job_title',
      })
      .populate({
        path: 'job_recruiter'
      })
      .populate('questions')
      .populate('interviewer', '-password');

    if (!interviewer) {
      throw new NotFoundException('interviewer not found');
    }
    return interviewer;
  }

  async update(id: string, updateInterviewerDto: UpdateInterviewerDto) {
    let interviewer = await this.interviewerModel.findById(id);
    if (!interviewer) {
      throw new NotFoundException('interview not found');
    }
    return await this.interviewerModel
      .findByIdAndUpdate(id, updateInterviewerDto, { new: true })
      // .populate({
      //   path: 'interviewer',
      //   select: '-password',
      // })
      .populate({
        path: 'job_title',
      })
      .populate({
        path: 'job_recruiter'
      })
      .populate('questions')
      .populate('interviewer', '-password');
  }

  async remove(id: string) {
    let interviewer = await this.interviewerModel.findById(id);
    if (!interviewer) {
      throw new NotFoundException('interviewer not found');
    }
    return await this.interviewerModel
      .findByIdAndRemove(id)
      // .populate({
      //   path: 'interviewer',
      //   select: '-password',
      // })
      .populate({
        path: 'job_title',
      })
      .populate({
        path: 'job_recruiter'
      })
      .populate('questions');
  }

  //   async interviwee(id: string) {
  //     let interviews = await this.InterviewModel.find({
  //       job_id: id
  //     })
  //       .populate({
  //         path: 'interviewee',
  //         select: '-password',
  //       })
  //       .populate({
  //         path: 'job_id',
  //       })
  //       .populate('questions.question_id');
  //     if (interviews.length == 0) {
  //       throw new NotFoundException('interviews not found');
  //     }
  //     return interviews
  //   }
}
