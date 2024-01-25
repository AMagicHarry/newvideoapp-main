
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from '../services/media.service';
import { FileSizeValidationPipe } from '../decorators/file-size.decorator';
import { MediaTypeValidationPipe } from '../decorators/media-type.decorator';


@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

//   @Post('upload-image')
//   @UseInterceptors(FileInterceptor('image'))
//   uploadImage(@UploadedFile() image: Express.Multer.File): string {
//     return this.mediaService.saveImage(image);
//   }

//   @Post('upload-video')
//   @UseInterceptors(FileInterceptor('video'))
//   uploadVideo(@UploadedFile() video: Express.Multer.File): string {
//     return this.mediaService.saveVideo(video);
//   }



}
