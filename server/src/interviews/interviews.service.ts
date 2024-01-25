import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Interview } from './entities/interview.entity';
import { Model } from 'mongoose';
import { QuestionsService } from '../questions/questions.service';
import { MediaService } from 'media/services/media.service';
import * as mongoose from 'mongoose';
//imagekit service
// import { ImageKitService } from '../utils/imagekit.service';
@Injectable()
export class InterviewsService {
  constructor(
    @InjectModel('Interview') private InterviewModel: Model<Interview>,
    private questionsService: QuestionsService,
    // private readonly imageKitService: ImageKitService,
    private readonly mediaService: MediaService,
  ) {}

  async create(
    createInterviewDto: CreateInterviewDto,
    video?: Express.Multer.File,
  ) {
    // Check if the question exists

    const question = await this.questionsService.findOne(
      createInterviewDto.question_id,
    );
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    // Check if the interview exists
    const interview = await this.findQuestionAndJob(
      createInterviewDto.interviewee,
      question?.job_id?._id,
    );
    // Check if the question is already submitted for this interview
    if (
      interview?.questions?.some(
        (q) => q.question_id._id == createInterviewDto.question_id,
      )
    ) {
      throw new ConflictException(
        'You have already submitted a video for this question.',
      );
    }

    if (video) {
      //uploading video to imagekit
      createInterviewDto.video_url = await this.mediaService.saveVideo(video);
    }

    if (interview) {
      // Update the existing interview with the new question and video URL
      return await this.InterviewModel.findByIdAndUpdate(
        interview._id,
        {
          $push: {
            questions: {
              question_id: createInterviewDto.question_id,
              video_url: createInterviewDto.video_url,
            },
          },
        },
        {
          new: true,
        },
      );
    }

    return await this.InterviewModel.create({
      interviewee: createInterviewDto.interviewee,
      interviewer: createInterviewDto.interviewer,
      job_id: createInterviewDto.job_id,

      questions: [
        {
          question_id: createInterviewDto.question_id,
          video_url: createInterviewDto.video_url,
        },
      ],
    });
  }

  async createMany(body, recordings) {
    const _body = Object.keys(body).map((b) => JSON.parse(body[b]));

    if (_body?.length) {
      return await _body.map(
        async (createInterviewDto: CreateInterviewDto, index: any) => {
          console.log(createInterviewDto);
          // Check if the question exists
          const question = await this.questionsService.findOne(
            createInterviewDto.question_id,
          );
          if (!question) {
            // throw new NotFoundException('Question not found');
            return null;
          }

          // Check if the interview exists
          const interview = await this.findQuestionAndJob(
            createInterviewDto.interviewee,
            question?.job_id?._id,
          );
          // Check if the question is already submitted for this interview
          if (
            interview?.questions?.some(
              (q) => q.question_id._id == createInterviewDto.question_id,
            )
          ) {
            // throw new ConflictException(
            //   'You have already submitted a video for this question.',
            // );
            return null;
          }

          //uploading video to imagekit
          createInterviewDto.video_url = await this.mediaService.saveVideo(
            recordings[index],
          );
          if (interview) {
            // Update the existing interview with the new question and video URL
            return await this.InterviewModel.findByIdAndUpdate(
              interview._id,
              {
                $push: {
                  questions: {
                    question_id: createInterviewDto.question_id,
                    video_url: createInterviewDto.video_url,
                  },
                },
              },
              {
                new: true,
              },
            );
          }

          return await this.InterviewModel.create({
            interviewee: createInterviewDto.interviewee,
            interviewer: createInterviewDto.interviewer,
            job_id: createInterviewDto.job_id,
            questions: [
              {
                question_id: createInterviewDto.question_id,
                video_url: createInterviewDto.video_url,
              },
            ],
          });
        },
      );
    }
  }

  async findAll() {
    let interviews = await this.InterviewModel.find()
      .populate({
        path: 'interviewee',
        select: '-password',
      })
      .populate({
        path: 'job_id',
      })
      .populate({
        path: 'interviewer',
        select: '-password',
      })

      .populate('questions.question_id');

    if (interviews.length == 0) {
      throw new NotFoundException('interviews not found');
    }
    return interviews;
  }

  async findQuestionAndJob(interviewee: string, job_id: string) {
    let interview = await this.InterviewModel.findOne({
      job_id,
      interviewee,
    })
      .populate({
        path: 'interviewee',
        select: '-password',
      })
      .populate({
        path: 'job_id',
      })
      .populate('questions.question_id');
    return interview;
  }

  async findOne(id: string) {
    let interview = await this.InterviewModel.findById(id)
      .populate({
        path: 'interviewee',
        select: '-password',
      })
      .populate({
        path: 'job_id',
      })

      .populate({
        path: 'interviewer',
        select: '-password',
      })

      .populate('questions.question_id');
    if (!interview) {
      throw new NotFoundException('interview not found');
    }
    return interview;
  }

  async update(id: string, updateInterviewDto: UpdateInterviewDto) {
    let interview = await this.InterviewModel.findById(id);
    if (!interview) {
      throw new NotFoundException('interview not found');
    }
    await this.InterviewModel.findByIdAndUpdate(id, updateInterviewDto, {
      new: true,
    })
      .populate({
        path: 'interviewee',
        select: '-password',
      })
      .populate({
        path: 'job_id',
      })

      .populate({
        path: 'interviewer',
        select: '-password',
      })

      .populate('questions.question_id');
    return await this.InterviewModel.find()
      .populate({
        path: 'interviewee',
        select: '-password',
      })
      .populate({
        path: 'job_id',
      })
      .populate({
        path: 'interviewer',
        select: '-password',
      })

      .populate('questions.question_id');
  }

  async remove(id: string) {
    let interview = await this.InterviewModel.findById(id);
    if (!interview) {
      throw new NotFoundException('interview not found');
    }
    return await this.InterviewModel.findByIdAndRemove(id)
      .populate({
        path: 'interviewee',
        select: '-password',
      })
      .populate({
        path: 'job_id',
      })
      .populate({
        path: 'interviewer',
        select: '-password',
      })

      .populate('questions.question_id');
  }

  // async remove(id: string, userId: string) {
  //   let interview = await this.InterviewModel.findById(id);

  //   if (!interview) {
  //     throw new NotFoundException('Interview not found');
  //   }

  //   if (interview.interviewee.toString() !== userId) {
  //     throw new UnauthorizedException('You do not have permission to delete this interview');
  //   }
  //   return await this.InterviewModel.findByIdAndRemove(id)
  //     .populate({
  //       path: 'interviewee',
  //       select: '-password',
  //     })
  //     .populate({
  //       path: 'job_id',
  //     })
  //     .populate({
  //       path: 'interviewer',
  //       select: '-password',
  //     })
  //     .populate('questions.question_id');
  // }

  async interviwee(id: string) {
    let interviews = await this.InterviewModel.find({
      job_id: id,
    })
      .populate({
        path: 'interviewee',
        select: '-password',
      })
      .populate({
        path: 'job_id',
      })
      .populate({
        path: 'interviewer',
        select: '-password',
      })
      .populate('questions.question_id');
    if (interviews.length == 0) {
      throw new NotFoundException('interviews not found');
    }
    return interviews;
  }

  async findInterviewsByTimeRange(timeRange: string): Promise<Interview[]> {
    const currentDate = new Date();

    switch (timeRange) {
      case 'lastHour':
        currentDate.setHours(currentDate.getHours() - 1);
        break;
      case 'today':
        currentDate.setHours(0, 0, 0, 0);
        break;
      case 'thisWeek':
        currentDate.setDate(currentDate.getDate() - currentDate.getDay());
        currentDate.setHours(0, 0, 0, 0);
        break;
      case 'thisMonth':
        currentDate.setDate(1);
        currentDate.setHours(0, 0, 0, 0);
        break;
      case 'thisYear':
        currentDate.setMonth(0, 1);
        currentDate.setHours(0, 0, 0, 0);
        break;
      case 'recent':
        return await this.InterviewModel.find({})
          .sort({ createdAt: -1 })
          .populate({
            path: 'interviewee',
            select: '-password',
          })
          .populate({
            path: 'job_id',
          })
          .populate({
            path: 'interviewer',
            select: '-password',
          })
          .populate('questions.question_id');

      case 'byIntervieweeName':
        return await this.InterviewModel.find({})
          .sort({ 'interviewee.name': 1 })
          .populate({
            path: 'interviewee',
            select: '-password',
          })
          .populate({
            path: 'job_id',
          })
          .populate({
            path: 'interviewer',
            select: '-password',
          })
          .populate('questions.question_id');

      default:
        throw new NotFoundException('Invalid filter');
    }

    const interviews = await this.InterviewModel.find({
      createdAt: { $gte: currentDate },
    })
      .populate({
        path: 'interviewee',
        select: '-password',
      })
      .populate({
        path: 'job_id',
      })
      .populate({
        path: 'interviewer',
        select: '-password',
      })
      .populate('questions.question_id');

    if (interviews.length === 0) {
      throw new NotFoundException('Interviews not found');
    }

    return interviews;
  }

  async allInterviwee(id: string) {
    let interviews = await this.InterviewModel.find({
      interviewer: new mongoose.Types.ObjectId(id),
    })
      .populate({
        path: 'interviewee',
        select: '-password',
      })
      .populate({
        path: 'job_id',
      })
      .populate({
        path: 'interviewer',
        select: '-password',
      })
      .populate('questions.question_id');
    if (interviews.length == 0) {
      throw new NotFoundException('interviews not found');
    }
    return interviews;
  }

  async getRandomInterviews() {
    const formattedInterviews = await this.InterviewModel.find()
      .populate({
        path: 'questions.question_id',
      })
      .populate({
        path: 'interviewee',
      });

    const randomInterviews = this.shuffleArray(formattedInterviews).slice( 0, 10, );

    const result = randomInterviews.map((interview) => ({
      _id: interview._id,
      questions: interview.questions.map((question) => ({
        question_id: {
          _id: question.question_id._id,
          question: question.question_id.question,
          time_duration: question.question_id.time_duration,
        },
        video_url: question.video_url,
        _id: question._id,
      })),
      interviewee: interview.interviewee
        ? {
            name: interview.interviewee.name,
            location: interview.interviewee.location,
          }
        : null,
    }));

    return result;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
