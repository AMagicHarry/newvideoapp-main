import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FavouriteInterviewService } from '../services/favourite.service';
import { CreateFavoriteInterviewDto } from '../dtos/create-favourite.dto';
import { UpdateFavoriteInterviewDto } from '../dtos/update-favourite.dto';

@Controller('favourite-interviews')
export class FavouriteInterviewController {
  constructor(private readonly favoriteInterviewService: FavouriteInterviewService) {}

  @Post('create')
  create(@Body() createFavoriteInterviewDto: CreateFavoriteInterviewDto) {
    return this.favoriteInterviewService.create(createFavoriteInterviewDto);
  }

  @Get()
  findAll() {
    return this.favoriteInterviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteInterviewService.findOne(id);
  }

  @Put(':id/update')
  update(@Param('id') id: string, @Body() updateFavoriteInterviewDto: UpdateFavoriteInterviewDto) {
    return this.favoriteInterviewService.update(id, updateFavoriteInterviewDto);
  }

  @Delete(':id/delete')
  remove(@Param('id') id: string) {
    return this.favoriteInterviewService.remove(id);
  }
}
