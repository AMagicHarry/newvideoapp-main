import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoUploadingDto } from './create-video-uploading.dto';

export class UpdateVideoUploadingDto extends PartialType(CreateVideoUploadingDto) {}
