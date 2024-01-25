// media-type-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class MediaTypeValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const file: Express.Multer.File = value;

    if (!file) {
      return value; 
    }

    // Validate file type
    if (file.mimetype.startsWith('image/')) {
      const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const fileExt = file.originalname.split('.').pop().toLowerCase();
      if (!allowedImageTypes.includes(file.mimetype) && !allowedImageTypes.includes(fileExt)) {
        throw new BadRequestException(`File ${file.originalname} has an invalid image media type. JPEG, JPG, PNG required`);
      }
    } else if (file.mimetype.startsWith('video/')) {
      const allowedVideoTypes = ['video/mp4'];
      const fileExt = file.originalname.split('.').pop().toLowerCase();
      if (!allowedVideoTypes.includes(file.mimetype) && fileExt !== 'mp4') {
        throw new BadRequestException(`File ${file.originalname} has an invalid video media type or extension. Only MP4 required`);
      }
    } else {
      throw new BadRequestException(`File ${file.originalname} has an unsupported media type.`);
    }

    return value;
  }
}