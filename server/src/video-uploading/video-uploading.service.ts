import { Injectable } from '@nestjs/common';
import { CreateVideoUploadingDto } from './dto/create-video-uploading.dto';
import { UpdateVideoUploadingDto } from './dto/update-video-uploading.dto';
import { ImageKitService } from 'src/utils/imagekit.service';

@Injectable()
export class VideoUploadingService {
  constructor(private readonly imageKitService: ImageKitService) {}

  create(createVideoUploadingDto: CreateVideoUploadingDto) {
    return 'This action adds a new videoUploading';
  }

  async findAll(): Promise<any> {
    try {
      const fileList = await this.imageKitService.listAllFiles();

      return fileList;
    } catch (error) {
      console.error('Error fetching video list:', error);
      throw error; 
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} videoUploading`;
  }

  update(id: number, updateVideoUploadingDto: UpdateVideoUploadingDto) {
    return `This action updates a #${id} videoUploading`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoUploading`;
  }


}

