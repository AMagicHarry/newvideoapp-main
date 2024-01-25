import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { InterviewerService } from '../services/interviewer.service';
import { CreateInterviewerDto } from '../dtos/create-interviewer.dto';
import { UpdateInterviewerDto } from '../dtos/update-interviewer.dto';
 // JWT auth guard
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//Role Guard
import { RolesGuard } from 'src/auth/role-base-auth/role.guard';
import { Roles } from 'src/auth/role-base-auth/roles.decorator';
import { ROLE } from '../../users/enums/users.enums'

@Controller('interviewer')
export class InterviewerController {
  constructor(private readonly interviewerService: InterviewerService,
  ) { }

  @Post("create")
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(ROLE.INTERVIEWER)
  async create(
  @Body() createInterviewerDto: CreateInterviewerDto, @Request() req) {
        createInterviewerDto.interviewer = createInterviewerDto.interviewer
    return this.interviewerService.create(createInterviewerDto);
  }

  @Get()
  findAll() {
    return this.interviewerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterviewerDto: UpdateInterviewerDto) {
    return this.interviewerService.update(id, updateInterviewerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interviewerService.remove(id);
  }

}
