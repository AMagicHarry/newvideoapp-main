import { Test, TestingModule } from '@nestjs/testing';
import { VideoUploadingController } from './video-uploading.controller';
import { VideoUploadingService } from './video-uploading.service';

describe('VideoUploadingController', () => {
  let controller: VideoUploadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoUploadingController],
      providers: [VideoUploadingService],
    }).compile();

    controller = module.get<VideoUploadingController>(VideoUploadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
