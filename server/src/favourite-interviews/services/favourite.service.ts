import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavouriteInterview } from '../entities/favourite.entity';
import { CreateFavoriteInterviewDto } from '../dtos/create-favourite.dto';
import { UpdateFavoriteInterviewDto } from '../dtos/update-favourite.dto';
import { InterviewsService } from 'src/interviews/interviews.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FavouriteInterviewService {
  constructor(
    @InjectModel(FavouriteInterview.name)
    private favouriteInterviewModel: Model<FavouriteInterview>,
    private interviewService: InterviewsService,
    private userService: UsersService,
  ) {}

  async create(
    createFavoriteInterviewDto: CreateFavoriteInterviewDto,
  ): Promise<{ message: string; createdFavoriteInterview: FavouriteInterview }> {
      const interview = await this.interviewService.findOne(
      createFavoriteInterviewDto.favoriteInterview,
    );

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

      const user = await this.userService.findById(

      createFavoriteInterviewDto.interviewer,
    );


    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const createdFavoriteInterview = await this.favouriteInterviewModel.create(
      createFavoriteInterviewDto
    );
    return {
      message: 'Interview favorited successfully',
      createdFavoriteInterview,
    };
    }

  async findAll(): Promise<FavouriteInterview[]> {
    return await this.favouriteInterviewModel
      .find()
      .populate({
        path: 'interviewer',
        select: '-password',
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'job_id',
          select: '-password',
        },
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'questions.question_id',
        },
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'interviewee',
        },
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'interviewer',
        },
      })
      .exec();
  }

  async findOne(id: string): Promise<FavouriteInterview> {
    const favoriteInterview = await this.favouriteInterviewModel
      .findById(id)
      .populate({
        path: 'interviewer',
        select: '-password',
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'job_id',
          select: '-password',
        },
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'questions.question_id',
        },
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'interviewee',
        },
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'interviewer',
        },
      })
      .exec();
    if (!favoriteInterview) {
      throw new NotFoundException('Favorite interview not found');
    }
    return favoriteInterview;
  }

  async update(
    id: string,
    updateFavoriteInterviewDto: UpdateFavoriteInterviewDto,
  ): Promise<{ message: string; updatedFavoriteInterview: FavouriteInterview }> {
      const favoriteInterview = await this.favouriteInterviewModel
      .findByIdAndUpdate(id, updateFavoriteInterviewDto, { new: true })
      .populate({
        path: 'interviewer',
        select: '-password',
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'job_id',
          select: '-password',
        },
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'questions.question_id',
        },
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'interviewee',
        },
      })
      .populate({
        path: 'favoriteInterview',
        select: '-password',
        populate: {
          path: 'interviewer',
        },
      })

      .exec();

    if (!favoriteInterview) {
      throw new NotFoundException('Favorite interview not found');
    }

    return {
      message: 'Favorite interview updated successfully',
      updatedFavoriteInterview: favoriteInterview,
    };
    }

  async remove(
    id: string,
  ): Promise<{
    message: string;
    removedFavoriteInterview: FavouriteInterview;
  }> {
    const favoriteInterview = await this.favouriteInterviewModel
      .findByIdAndRemove(id)
      .exec();

    if (!favoriteInterview) {
      throw new NotFoundException('Favorite interview not found');
    }

    return {
      message: 'Favorite interview deleted successfully',
      removedFavoriteInterview: favoriteInterview,
    };
  }
}
