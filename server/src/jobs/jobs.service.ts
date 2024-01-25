import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './entities/job.entity'
import { Model } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel('Job') private JobModel: Model<Job>) { }

  async create(createJobDto: CreateJobDto) {
    return ((await this.JobModel.create(createJobDto)))
    // .populate({
    //   path: 'created_by',
    //   select: '-password',
    // });
  }

  async findAll() {
    let jobs = await this.JobModel.find()
    // .populate({
    //   path: 'created_by',
    //   select: '-password',
    // })
    if (jobs.length == 0) {
      throw new NotFoundException('jobs not found')
    }
    return jobs
  }

  async findOne(id: string) {
    let job = await this.JobModel.findById(id)
      // .populate({
      //   path: 'created_by',
      //   select: '-password',
      // })
    if (!job) {
      throw new NotFoundException('job not found');
    }
    return job
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    let job = await this.JobModel.findById(id)
    if (!job) {
      throw new NotFoundException('job not found');
    }
    return await this.JobModel.findByIdAndUpdate(
      id,
      updateJobDto,
      { new: true }
    )
    // .populate({
    //   path: 'created_by',
    //   select: '-password',
    // })
  }

  async remove(id: string) {
    let job = await this.JobModel.findById(id)
    if (!job) {
      throw new NotFoundException('job not found');
    }
    return await this.JobModel.findByIdAndRemove(id)
    // .populate({
    //   path: 'created_by',
    //   select: '-password',
    // })
  }
  async myJobs(id: string) {
    let jobs = await this.JobModel.find({
      created_by: id
    })
    if (!jobs) {
      throw new NotFoundException('jobs not found');
    }
    return jobs
  }
}


