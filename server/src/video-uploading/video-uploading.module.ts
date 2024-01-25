import { Module } from '@nestjs/common';
import { VideoUploadingService } from './video-uploading.service';
import { VideoUploadingController } from './video-uploading.controller';
import { ImageKitService } from '../utils/imagekit.service'

@Module({
  controllers: [VideoUploadingController],
  providers: [VideoUploadingService, ImageKitService]
})
export class VideoUploadingModule { }
