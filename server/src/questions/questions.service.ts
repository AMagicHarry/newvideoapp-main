import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './entities/question.entity';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Question') private QuestionModel: Model<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const user_Id = createQuestionDto.user_Id || null;

    const createdQuestion = await this.QuestionModel.create({
      ...createQuestionDto,
      user_Id,
    });

    return createdQuestion;
  }

  async findAll(userId?: string) {
    let query: any = {};

    if (userId) {
      query = { $or: [{ user_id: userId }, { user_id: { $exists: false } }] };
    } else {
      query = { user_id: { $exists: false } };
    }

    let questions = await this.QuestionModel.find(query);

    if (questions.length === 0) {
      throw new NotFoundException('Questions not found');
    }

    if (userId) {
      questions = await this.QuestionModel.populate(questions, {
        path: 'user_id',
        select: '-password',
      });
    }

    return questions;
  }

  async findOne(id: string) {
    let question = await this.QuestionModel.findById(id);

    if (!question) {
      throw new NotFoundException('question not found');
    }
    question = await this.QuestionModel.populate(question, {
      path: 'user_id',
      select: '-password',
    });

    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    let question = await this.QuestionModel.findById(id);

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    question = await this.QuestionModel.findByIdAndUpdate(
      id,
      updateQuestionDto,
      {
        new: true,
      },
    );

    question = await this.QuestionModel.populate(question, {
      path: 'user_id',
      select: '-password',
    });

    return question;
  }

  async remove(id: string) {
    let question = await this.QuestionModel.findById(id);

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    question = await this.QuestionModel.populate(question, {
      path: 'user_id',
      select: '-password',
    });

    return await this.QuestionModel.findByIdAndRemove(id);
  }

  // async jobQuestions(id: string) {
  //   let questions = await this.QuestionModel.find({
  //     job_id: id
  //   }).populate({
  //     path: 'job_id',
  //   })
  //   if (!questions) {
  //     throw new NotFoundException('questions not found');
  //   }
  //   return questions
  // }
}
