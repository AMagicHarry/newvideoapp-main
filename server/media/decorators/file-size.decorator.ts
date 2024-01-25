// file-size-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const file: Express.Multer.File = value;

    if (!file) {
      return value; 
    }

    let maxSize;
    let fileType;

    if (file.mimetype.startsWith('image')) {
      maxSize = 5 * 1024 * 1024; // 5 MB for images
      fileType = 'image';
    } else if (file.mimetype.startsWith('video')) {
      maxSize = 5 * 1024 * 1024; // 5 MB for videos
      fileType = 'video';
    } 

    if (file.size > maxSize) {
      const errorMessage = `File ${file.originalname} exceeds the allowed ${fileType}.`;
      if (fileType === 'image') {
        throw new BadRequestException(`${errorMessage} Please upload an image file with a size limit of 5 MB.`);
      } else if (fileType === 'video') {
        throw new BadRequestException(`${errorMessage} Please upload a video file with a size limit of 5 MB.`);
      } else {
        throw new BadRequestException(errorMessage);
      }
    }

    return value;
  }
}