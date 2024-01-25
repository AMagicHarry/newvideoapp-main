import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseFilePipeBuilder,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';

import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
// JWT auth guard
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
//Role Guard
import { RolesGuard } from '../auth/role-base-auth/role.guard';
import { Roles } from '../auth/role-base-auth/roles.decorator';
import { ROLE } from '../users/enums/users.enums';

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(ROLE.INTERVIEWEE)
  @UseInterceptors(FileInterceptor('video'))
  async create(
    @Body() createInterviewDto: CreateInterviewDto,
    @UploadedFile() video?: Express.Multer.File,
  ) {
    // createInterviewDto.interviewee = req.user.id
    return this.interviewsService.create(createInterviewDto, video);
  }

  @Get('random')
  async getRandomInterviews() {
    const randomInterviews = await this.interviewsService.getRandomInterviews();
    return randomInterviews;
  }


  @Post('/submit-questions')
  @UseInterceptors(AnyFilesInterceptor())
  async createMany(
    @UploadedFiles() recordings: Array<Express.Multer.File>,
    @Body() body,
  ) {
    return this.interviewsService.createMany(body, recordings);
  }

  @Get()
  async findAll(
    @Query('filter') filters?: string | string[],
    @Query('intervieweeName') intervieweeName?: string,
  ) {
    let interviews;

    if (filters) {
      const filterArray = Array.isArray(filters) ? filters : [filters];

      if (filterArray.length > 0) {
        interviews = await Promise.all(
          filterArray.map((filter) =>
            this.interviewsService.findInterviewsByTimeRange(filter),
          ),
        );
        interviews = interviews.flat();
      }
    } else {
      interviews = await this.interviewsService.findAll();
    }

    return interviews;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterviewDto: UpdateInterviewDto,
  ) {
    return this.interviewsService.update(id, updateInterviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interviewsService.remove(id);
  }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // remove(@Param('id') id: string, @Request() req) {
  //   const userId = req.user.id;
  //   return this.interviewsService.remove(id, userId);
  // }

  @Get('user/all-interviews/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.INTERVIEWER)
  allInterviewsfor(@Request() req, @Param('id') id: string) {
    return this.interviewsService.interviwee(id);
  }

  @Get('all-interviews-by-interviewer/:id')
  allInterviewsByInterviewer(@Request() req, @Param('id') id: string) {
    return this.interviewsService.allInterviwee(id);
  }


}


