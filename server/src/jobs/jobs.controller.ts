import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
// JWT auth guard
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
//Role Guard
import { RolesGuard } from '../auth/role-base-auth/role.guard';
import { Roles } from '../auth/role-base-auth/roles.decorator'
import { ROLE } from '../users/enums/users.enums'

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(ROLE.INTERVIEWER)
  create(@Body() createJobDto: CreateJobDto, @Request() req) {
    // createJobDto.created_by = createJobDto.created_by
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }

  @Get('user/jobs')
  @UseGuards(JwtAuthGuard)
  myJobs(@Request() req) {
    return this.jobsService.myJobs(req.user.id.toString());
  }


}
